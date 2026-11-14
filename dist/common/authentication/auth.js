"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const auth_res_1 = __importDefault(require("../../module/auth/auth.res"));
const redis_connection_1 = __importDefault(require("../../DB/redis.connection"));
const config_1 = require("../../config/config");
const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error('Token not exists');
        }
        const decoded = (require('jsonwebtoken')).verify(token, config_1.ACCESS_TOKEN_SECRET);
        console.log("Decoded ID:", decoded.id);
        const user = await auth_res_1.default.findUserById(decoded.id);
        console.log("Authentication Search:", user);
        if (!user) {
            throw new Error('User not found');
        }
        if (user?.changecredital && user.changecredital.getTime() > decoded.iat * 1000) {
            throw new Error("token expier must login again");
        }
        if (await redis_connection_1.default.ttl(`revoke-token::${user.id}::${decoded.jti}`) > 0) {
            throw new Error("invalid revoke-token");
        }
        req.user = user;
        req.decoded = decoded;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.authentication = authentication;
//# sourceMappingURL=auth.js.map