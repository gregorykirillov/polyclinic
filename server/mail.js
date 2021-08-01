const nodemailer = require("nodemailer");
const dotenv = require('dotenv').config()

async function Mail(lName, fName, mName, phone, docId, docName, docSpec, date){
    let transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: process.env.REACT_APP_MAIL_USER,
            pass: process.env.REACT_APP_MAIL_PASSWORD,
        }
    });
    
    let info = await transporter.sendMail({
        from: `"Поликлиника React ${process.env.REACT_APP_MAIL_USER}"`,
        to: "kgn.0@ya.ru",
        subject: "Новая заявка",
        text:  
            `ФИО: ${lName} ${fName} ${mName}\n` + 
            `Телефон: ${phone}\n` + 
            `ID врача: ${docId}\n` +
            `Врач: ${docName}\n` +
            `Специальность: ${docSpec}\n` +
            (date[0] ? `Дата: ${date[0]}\n` +
            `Время: ${date[1]}-${date[2]}` : ``),
    });
};

module.exports = {Mail};