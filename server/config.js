import dotenv from 'dotenv';
dotenv.config();

export const mailUser = process.env.MAIL_USER;
export const mailPassword = process.env.MAIL_PASSWORD;

export const host = process.env.DB_HOST;
export const user = process.env.DB_USERNAME;
export const password = process.env.DB_PASSWORD;
export const database = process.env.DB_DATABASE;
export const port = process.env.PORT || 5000;
export const mailReceiver = process.env.MAIL_RECEIVER;