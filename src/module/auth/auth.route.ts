import { Router } from "express";
import authcontroller from "./auth.controller";
import { Validation } from "../../common/middelware/validation";
import { refreshTokenSchema, reseatPasswordSchema, signUpSchema } from "./valdition";
import { authentication } from "../../common/authentication/auth";
const authRouter = Router();

authRouter.post("/signup", Validation(signUpSchema),authcontroller.singup);
authRouter.post("/signin",authcontroller.singin);
authRouter.get("/profile",authentication,authcontroller.getProfile);
authRouter.post("/google",authcontroller.signupeWithGmail);
authRouter.post("/refresh", Validation(refreshTokenSchema), authcontroller.refreshToken);
authRouter.post('/forgot-password', authcontroller.forgetPassword);
authRouter.post('/reset-password', Validation(reseatPasswordSchema), authcontroller.reseatPassword);
export default authRouter;