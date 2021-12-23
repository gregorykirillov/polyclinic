import dotenv from 'dotenv';
dotenv.config();

export const mailUser = process.env.REACT_APP_MAIL_USER;
export const mailPassword = process.env.REACT_APP_MAIL_PASSWORD;

export const host = process.env.REACT_APP_DB_HOST;
export const user = process.env.REACT_APP_DB_USERNAME;
export const password = process.env.REACT_APP_DB_PASSWORD;
export const database = process.env.REACT_APP_DB_DATABASE;
export const port = process.env.REACT_APP_PORT || 5000;
export const mailReceiver = process.env.REACT_APP_MAIL_RECEIVER;