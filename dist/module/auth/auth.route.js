"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const validation_1 = require("../../common/middelware/validation");
const valdition_1 = require("./valdition");
const auth_1 = require("../../common/authentication/auth");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", (0, validation_1.Validation)(valdition_1.signUpSchema), auth_controller_1.default.singup);
authRouter.post("/signin", auth_controller_1.default.singin);
authRouter.get("/profile", auth_1.authentication, auth_controller_1.default.getProfile);
authRouter.post("/google", auth_controller_1.default.signupeWithGmail);
authRouter.post("/refresh", (0, validation_1.Validation)(valdition_1.refreshTokenSchema), auth_controller_1.default.refreshToken);
authRouter.post('/forgot-password', auth_controller_1.default.forgetPassword);
authRouter.post('/reset-password', (0, validation_1.Validation)(valdition_1.reseatPasswordSchema), auth_controller_1.default.reseatPassword);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map