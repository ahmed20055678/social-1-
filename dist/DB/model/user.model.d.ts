import mongoose from "mongoose";
import { GenderEnum, providerEnum, RoleEnum } from "../../common/enums/enums";
export interface IUser {
    fName: string;
    lName: string;
    email: string;
    password?: string;
    gender?: GenderEnum;
    role?: RoleEnum;
    isConfirmed?: boolean;
    phone?: string;
    profileImage?: string;
    changecredital?: Date;
    provider?: providerEnum;
}
export interface IGoogleUser {
    email: string;
    given_name: string;
    family_name: string;
    picture: string;
    email_verified: boolean;
}
declare const userModel: mongoose.Model<any, {}, {}, {}, any, any, any> | mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default userModel;
//# sourceMappingURL=user.model.d.ts.map