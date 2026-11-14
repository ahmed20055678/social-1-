import type { IUser } from "./DB/model/user.model";
import type { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
            decoded?: string | JwtPayload;
        }

        interface Response {
            success(statusCode: number, data?: unknown): this;
        }
    }
}

export {};