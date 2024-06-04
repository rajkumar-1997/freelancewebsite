import { Sequelize } from 'sequelize';
import { DBName, DBPassword, DBUserName, DBHost } from './envConfig';

const sequelize = new Sequelize(DBName, DBUserName, DBPassword, {
  host: DBHost,
  dialect: 'postgres',
});

// const connectDB = async (): Promise<void> => {
//   try {
//     await sequelize.authenticate();
    
//     // await sequelize.sync();
//     console.log('Database connected');
//   } catch (error) {
//     console.error('Database Error:', error);
//   }
// };

export {  sequelize };


