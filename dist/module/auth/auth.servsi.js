"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_res_1 = __importDefault(require("./auth.res"));
const hash_1 = require("../../common/hash/hash");
const globalError_1 = require("../../common/utills/globalError");
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const redis_connection_1 = __importDefault(require("../../DB/redis.connection"));
const sendEmail_1 = require("../../common/sendEmail/sendEmail");
const event_1 = __importDefault(require("../../common/sendEmail/event"));
const enums_1 = require("../../common/enums/enums");
class authService {
    constructor() { }
    singup = async ({ email, password, fName, lName, gender, role, isConfirmed, phone, profileImage }) => {
        const user = await auth_res_1.default.findUserByEmail(email);
        if (user) {
            throw new Error("user already exists");
        }
        const newUser = await auth_res_1.default.createUser({
            email,
            password,
            fName,
            lName,
            gender,
            role,
            isConfirmed: true,
            phone,
            profileImage
        });
        if (!newUser) {
            throw new Error("Failed to create user");
        }
        const otp = await (0, sendEmail_1.generateOtp)();
        const otpHash = await (0, hash_1.Hash)(otp);
        await redis_connection_1.default.setValue({
            key: `otp:${email}`,
            value: otpHash,
            ttl: 60 * 5
        });
        event_1.default.emit("confirm-email", async () => {
            await (0, sendEmail_1.sendEmail)({
                to: email,
                subject: "Confirm Email",
                html: `<h1>otp:${otp}</h1>`
            });
        });
        await redis_connection_1.default.setValue({
            key: `otp::max::${email}`,
            value: 1,
            ttl: 60 * 7
        });
        return newUser;
    };
    singin = async ({ email, password }) => {
        const user = await auth_res_1.default.findUserByEmail(email);
        if (!user) {
            throw new Error("user not found");
        }
        if (!user.password || !await (0, hash_1.CompareHash)(password, user.password)) {
            throw new globalError_1.AppError("incorrect password", 401);
        }
        const token = (0, crypto_1.randomUUID)();
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 2,
            notBefore: 0,
            jwtid: token });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.REFRESH_TOKEN_SECRET, { expiresIn: 60 * 60 });
        return { user, accessToken, refreshToken };
    };
    getProfile = async (token) => {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.ACCESS_TOKEN_SECRET);
        const user = await auth_res_1.default.findUserByEmail(decoded.email);
        if (!user) {
            throw new Error("user not found");
        }
        return decoded;
    };
    signupeWithGmail = async (data, idToken) => {
        let user = await auth_res_1.default.findUserByEmail(data.email);
        if (!user) {
            user = await auth_res_1.default.createUser({
                email: data.email,
                fName: data.given_name,
                lName: data.family_name,
                profileImage: data.picture,
                isConfirmed: data.email_verified,
                role: enums_1.RoleEnum.user,
                provider: enums_1.providerEnum.google
            });
            if (user.provider == "system") {
                throw new Error("user already exiest");
            }
            const accessToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, "ACCESS_TOKEN_SECRET", {
                expiresIn: 60 * 2,
                notBefore: 30,
            });
            const refreshToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, "REFRESH_TOKEN_SECRET");
        }
        return { user };
    };
    refreshToken = async (token) => {
        if (!token) {
            throw new Error("token not send");
        }
        const decode = jsonwebtoken_1.default.verify(token, config_1.REFRESH_TOKEN_SECRET);
        const user = await auth_res_1.default.findUserByEmail(decode.email);
        if (!user) {
            throw new Error("user not found");
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.ACCESS_TOKEN_SECRET, {
            expiresIn: 60 * 2
        });
        return { decode, accessToken };
    };
    forgetPassword = async (email) => {
        const blocked_ttl = await redis_connection_1.default.ttl(`otp::block::${email}`);
        if (blocked_ttl > 0) {
            throw new Error(`you block you can resend otp after ${blocked_ttl}`);
        }
        const otpTti = await redis_connection_1.default.ttl(`otp:${email}`);
        if (otpTti > 0) {
            throw new Error(`you can resend otp after ${otpTti}`);
        }
        const maxOtp = await redis_connection_1.default.getValue(`otp::max::${email}`);
        if (maxOtp >= 5) {
            await redis_connection_1.default.setValue({
                key: `otp::block::${email}`,
                value: "1",
                ttl: 60 * 10
            });
            throw new Error(`you have excuded the maximum number of tries`);
        }
        const user = await auth_res_1.default.findUserByEmail(email, { isConfirmed: true });
        if (!user) {
            throw new Error("user not exiest or isConfirmed");
        }
        const otp = await (0, sendEmail_1.generateOtp)();
        const otpHash = await (0, hash_1.Hash)(otp);
        await redis_connection_1.default.setValue({
            key: `otp:${email}`,
            value: otpHash,
            ttl: 60 * 5
        });
        event_1.default.emit("confirm-email", async () => {
            await (0, sendEmail_1.sendEmail)({
                to: email,
                subject: "Confirm Email",
                html: `<h1>otp:${otp}</h1>`
            });
        });
        return await redis_connection_1.default.incr(`otp::max::${email}`);
    };
    reseatPassword = async (email, code, password, Cpassword) => {
        const otp = await redis_connection_1.default.getValue(`otp:${email}`);
        if (!otp) {
            throw new Error('otp expiar');
        }
        if (!await (0, hash_1.CompareHash)(code, otp)) {
            throw new Error('invaled otp');
        }
        const user = await auth_res_1.default.updateUserByEmail(email, { password: await (0, hash_1.Hash)(password), changecredital: new Date() });
        if (!user) {
            throw new Error("user not exiest or isConfirmed");
        }
        return await redis_connection_1.default.deleteKey(`otp:${email}`);
    };
}
exports.default = new authService();
//# sourceMappingURL=auth.servsi.js.map