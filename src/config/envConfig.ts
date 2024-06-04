import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT as string;
export const DBName = process.env.DB_NAME as string;
export const DBPassword = process.env.DB_PASSWORD as string;
export const DBUserName = process.env.DB_USERNAME as string;
export const DBHost = process.env.DB_HOST as string;
