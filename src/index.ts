import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { PORT } from './config/envConfig';
import { sequelize } from './config/databaseConfig';
import User from './models/user';
import Project from './models/project';
import ProjectTag from './models/projectTag';
import userRoutes from './routes/userRoute';
import projectRoutes from './routes/projectRoutes';
import projectTagRoutes from './routes/projectTagRoutes';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/projectTag', projectTagRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Hello from express app' });
});



const models = {
  User,
  Project,
  ProjectTag
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});
// Connect to database and start server
async function startServer() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Error starting server:', error);
    }
  }
  
  startServer();
