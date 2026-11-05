import nodemailer from "nodemailer";
import { env } from "../config/env.js";


export async function sendEmail(to, subject, html) {
    const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 587,
    service:'gmail',
    auth: {
        user: env.nodemailer.user,
        pass: env.nodemailer.password
    }
});

await transporter.sendMail({
        from: `"NGL-APP" <${process.env.MAIL_USER}>`,
        to: to,
        subject: subject,
        html: html
    });


}

