import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import dotenv from 'dotenv';
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user? : Record<string, any>
        }
    }
}
// Securing resources for each user by authentication
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  try {
    if (!token) throw new Error('Token not provided');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { userId: string };
    const user = await User.findByPk(userId);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).send({ type: 'error', message: 'Authorization Failed!' });
    }
  } catch (error) {
    console.log('error', error);
    res.status(401).send({ type: 'error', message: 'Authorization Failed!' });
  }
};


const isClient = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'Client') { 
    next();
  } else {
    res.status(403).send({ message: 'Access forbidden.' });
  }
};

export { authenticate, isClient};
