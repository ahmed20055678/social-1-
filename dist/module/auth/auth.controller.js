"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const auth_servsi_1 = __importDefault(require("./auth.servsi"));
const hash_1 = require("../../common/hash/hash");
const client = new google_auth_library_1.OAuth2Client();
class authcontroller {
    constructor() { }
    singup = async (req, res, next) => {
        try {
            const { email, password, fName, lName, gender, role, isConfirmed, phone, profileImage } = req.body;
            if (!password) {
                throw new Error("password is required");
            }
            const user = await auth_servsi_1.default.singup({ email, password: await (0, hash_1.Hash)(password), fName, lName, gender, role, isConfirmed, phone, profileImage });
            res.status(200).json({
                message: "signup successful",
                data: user
            });
        }
        catch (error) {
            next(error);
        }
    };
    singin = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await auth_servsi_1.default.singin({ email, password });
            res.status(200).json({
                message: "signin successful",
                token: {
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken
                }
            });
        }
        catch (error) {
            next(error);
        }
    };
    getProfile = async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new Error("token not send");
            }
            const user = await auth_servsi_1.default.getProfile(token);
            res.status(200).json({
                message: "profile retrieved successfully",
                data: user
            });
        }
        catch (error) {
            next(error);
        }
    };
    signupeWithGmail = async (req, res, next) => {
        try {
            const { idToken } = req.body;
            const decode = await client.verifyIdToken({
                idToken,
                audience: "419188861713-6pj8ssf3cfb8e37o94mqfm07uj5hfok9.apps.googleusercontent.com",
            });
            const payload = decode.getPayload();
            if (!payload) {
                throw new Error("Invalid Google Token");
            }
            const { email, given_name, family_name, picture, email_verified } = payload;
            if (!email || !given_name || !family_name || !email_verified) {
                throw new Error("Google account data is incomplete");
            }
            const user = await auth_servsi_1.default.signupeWithGmail({
                email,
                given_name,
                family_name,
                picture: picture || "",
                email_verified
            }, idToken);
            return res.status(201).json({
                message: "Signup successful",
                data: user
            });
        }
        catch (err) {
            next(err);
        }
    };
    refreshToken = async (req, res, next) => {
        try {
            console.log("HEADERS:", req.headers);
            console.log("TOKEN:", req.headers.token);
            const token = req.headers.token;
            console.log(req.headers);
            if (typeof token !== "string") {
                throw new Error("token not send");
            }
            const user = await auth_servsi_1.default.refreshToken(token);
            res.json({
                message: "user signin",
                accessToken: user.accessToken
            });
        }
        catch (err) {
            next(err);
        }
    };
    forgetPassword = async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await auth_servsi_1.default.forgetPassword(email);
            res.json({
                message: "done",
            });
        }
        catch (err) {
            next(err);
        }
    };
    reseatPassword = async (req, res, next) => {
        try {
            const { email, code, password, Cpassword } = req.body;
            const user = await auth_servsi_1.default.reseatPassword(email, code, password, Cpassword);
            res.json({
                message: "done",
            });
        }
        catch (err) {
            next(err);
        }
    };
}
exports.default = new authcontroller();
//# sourceMappingURL=auth.controller.js.map