"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const node_crypto_1 = require("node:crypto");
const sendEmail = async ({ to, subject, html } = {}) => {
    const transporter = nodemailer_1.default.createTransport({
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
    return info.accepted.length ? true : false;
};
exports.sendEmail = sendEmail;
const generateOtp = async () => {
    return await (0, node_crypto_1.randomInt)(100000, 1000000).toString();
};
exports.generateOtp = generateOtp;
//# sourceMappingURL=sendEmail.js.map