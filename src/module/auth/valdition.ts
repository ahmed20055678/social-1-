
import * as z from "zod";
import { GenderEnum, RoleEnum } from "../../common/enums/enums";

export const signUpSchema = {
    body: z.strictObject({
        fName: z.string().min(3).max(20).trim(),
        lName: z.string().min(3).max(20).trim(),
        email: z.string().email(),
        password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        Cpassword: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        gender: z.enum(GenderEnum).optional(),
        role: z.enum(RoleEnum).optional(),
        phone: z.string()
    }).superRefine((data, ctx) => {
        if (data.password !== data.Cpassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
            });
        }
    }),
};
export const refreshTokenSchema = {
    headers: z.object({
        token: z.string().min(1, "Token is required"),
        connection: z.string().optional(),
        "accept-encoding": z.string().optional(),
        accept: z.string().optional(),
        "user-agent": z.string().optional(),
        host: z.string().optional(),
        "content-length": z.string().optional(),
        "postman-token": z.string().optional(),
        "cache-control": z.string().optional()
    }).passthrough()
};
export const reseatPasswordSchema = {
    body: z.strictObject({
        email: z.string().email(),
        code: z.string().regex(/^[0-9]{6}$/),
        password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        Cpassword: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    }).superRefine((data, ctx) => {
        if (data.password !== data.Cpassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
            });
        }
    })
};