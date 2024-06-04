import { Sequelize } from 'sequelize';
import { DBName, DBPassword, DBUserName, DBHost } from './envConfig';

const sequelize = new Sequelize(DBName, DBUserName, DBPassword, {
  host: DBHost,
  dialect: 'postgres',
});

export {  sequelize };


