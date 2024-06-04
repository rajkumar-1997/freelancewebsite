import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user';

dotenv.config();
const saltRounds = 10;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

function isNotValid(str: string | undefined) {
  return !str || str.length === 0;
}

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, role } = req.body;
  if (isNotValid(username) || isNotValid(email) || isNotValid(password) || isNotValid(role)) {
    return res
      .status(400)
      .send({ type: 'error', message: 'Invalid Form Data!' });
  }
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(409).send({message: 'Email Already Exists!' });
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      await User.create({ username, email, password: hash, role });
      res.status(200).send({ message: 'user created successfully' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (isNotValid(email) || isNotValid(password)) {
    return res
      .status(400)
      .send({ message: 'Invalid Form Data!' });
  }

  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(404).send({message: 'email not found!' });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Internal server error' });
        }
        if (result == true) {
          const token = jwt.sign(
            { userId: user.id, userEmail: user.email },
            JWT_SECRET_KEY
          );
          res
            .status(200)
            .send({ message: 'logged in successfully', sessionToken: token });
        } else {
          res
            .status(403)
            .send({  message: 'password is incorrect' });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export  {
  signUp,
  logIn,
};
