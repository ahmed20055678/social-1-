
import mongoose from "mongoose";
import { GenderEnum, providerEnum, RoleEnum } from "../../common/enums/enums";
import { AppError } from "../../common/utills/globalError";
import {Hash} from "../../common/hash/hash";
import { Encrypt } from "../../common/encryption/encryption";
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

const userScheme = new mongoose.Schema<IUser>(
    {
        fName: {
            type: String,
            trim: true,
            minLength: 3,
            maxLength: 20,
            required: true,
        },

        lName: {
            type: String,
            trim: true,
            minLength: 3,
            maxLength: 20,
            required: true,
        },

        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },

        password: {
            type: String,
            trim: true,
            required: function(){
        return this.provider=="system" ? true : false
        },
        },

        gender: {
            type: String,
            enum: [GenderEnum.female, GenderEnum.male],
            default: GenderEnum.male,
        },

        role: {
            type: String,
            enum: [RoleEnum.user, RoleEnum.admin],
            default: RoleEnum.user,
        },
        provider: {
            type: String,
            enum: [providerEnum.google, providerEnum.system],
            default: providerEnum.system,
        },
        phone: String,

        profileImage: String,

        isConfirmed: Boolean,
    },
    {
        timestamps: true,
        strictQuery: true,
    }
);


userScheme.pre("save", async function () {
    this.phone=Encrypt(this.phone as any)
})
const userModel =
    mongoose.models.User ||
    mongoose.model<IUser>("User", userScheme);

export default userModel;
function hashSync(password: string, arg1: number): string {
    throw new Error("Function not implemented.");
}

function sendEmail(arg0: { to: string; subject: string; }) {
    throw new Error("Function not implemented.");
}

