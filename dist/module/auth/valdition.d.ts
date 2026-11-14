import * as z from "zod";
import { GenderEnum, RoleEnum } from "../../common/enums/enums";
export declare const signUpSchema: {
    body: z.ZodObject<{
        fName: z.ZodString;
        lName: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        Cpassword: z.ZodString;
        gender: z.ZodOptional<z.ZodEnum<typeof GenderEnum>>;
        role: z.ZodOptional<z.ZodEnum<typeof RoleEnum>>;
        phone: z.ZodString;
    }, z.core.$strict>;
};
export declare const refreshTokenSchema: {
    headers: z.ZodObject<{
        token: z.ZodString;
        connection: z.ZodOptional<z.ZodString>;
        "accept-encoding": z.ZodOptional<z.ZodString>;
        accept: z.ZodOptional<z.ZodString>;
        "user-agent": z.ZodOptional<z.ZodString>;
        host: z.ZodOptional<z.ZodString>;
        "content-length": z.ZodOptional<z.ZodString>;
        "postman-token": z.ZodOptional<z.ZodString>;
        "cache-control": z.ZodOptional<z.ZodString>;
    }, z.core.$loose>;
};
export declare const reseatPasswordSchema: {
    body: z.ZodObject<{
        email: z.ZodString;
        code: z.ZodString;
        password: z.ZodString;
        Cpassword: z.ZodString;
    }, z.core.$strict>;
};
//# sourceMappingURL=valdition.d.ts.map