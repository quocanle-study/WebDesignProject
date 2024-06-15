import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export default {
    siteName: process.env.SITE_NAME,
    host: process.env.HOST,
    env: process.env.NODE_ENV,
    port: process.env.PORT,
};
