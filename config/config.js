import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'task_app_db',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres'
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'postgres'
    }
};

export default config[env];