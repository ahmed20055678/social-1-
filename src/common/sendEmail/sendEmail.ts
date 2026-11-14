import nodemailer from "nodemailer";
import resolve from "node:path";
import { randomInt } from "node:crypto";

export const sendEmail = async ({ to, subject, html }: {
    to?: string;
    subject?: string;
    html?: string;
    attachments?: unknown[];
} = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ahmddyb349@gmail.com",
            pass: "dvbmuxcepargtnnt"
        }
    });

    const info = await transporter.sendMail({
        from: '"ahmed" <ahmddyb349@gmail.com>',
        to,
        subject,
        html: html || '',
    });

    return info.accepted .length ? true:false

};
export const generateOtp=async()=>{
    return await randomInt(100000,1000000).toString()
}
