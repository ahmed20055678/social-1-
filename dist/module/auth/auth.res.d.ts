import { IUser } from "../../DB/model/user.model";
import Repository from "../../DB/repository/repository";
declare class UserRepository extends Repository<IUser> {
    constructor();
    findUserByEmail: (email: string, options?: {
        isConfirmed?: boolean;
    }) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    createUser: (data: IUser) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findUserById: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    updateUser: (id: string, updateQuery: Partial<IUser>) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    updateUserByEmail: (email: string, value: Partial<IUser>) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
declare const _default: UserRepository;
export default _default;
//# sourceMappingURL=auth.res.d.ts.map