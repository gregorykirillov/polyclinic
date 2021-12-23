import nodemailer from 'nodemailer';
import {text} from './messageTemplate.js';
import {mailUser, mailPassword, mailReceiver} from '../config.js';

async function Mail(body){
    let transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: mailUser,
            pass: mailPassword,
        }
    });
    
    await transporter.sendMail({
        from: `"Поликлиника React ${mailUser}"`,
        to: mailReceiver,
        subject: "Новая заявка",
        text: text(body),
    });
};

export default Mail;