import { IGoogleUser, IUser } from "../../DB/model/user.model";
import jwt from "jsonwebtoken";
declare class authService {
    constructor();
    singup: ({ email, password, fName, lName, gender, role, isConfirmed, phone, profileImage }: IUser) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    singin: ({ email, password }: {
        email: string;
        password: string;
    }) => Promise<{
        user: import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    getProfile: (token: string) => Promise<jwt.JwtPayload>;
    signupeWithGmail: (data: IGoogleUser, idToken: any) => Promise<{
        user: import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    refreshToken: (token: string) => Promise<{
        decode: jwt.JwtPayload;
        accessToken: string;
    }>;
    forgetPassword: (email: string) => Promise<number>;
    reseatPassword: (email: string, code: string, password: string, Cpassword: string) => Promise<number>;
}
declare const _default: authService;
export default _default;
//# sourceMappingURL=auth.servsi.d.ts.map