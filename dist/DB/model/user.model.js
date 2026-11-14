"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("../../common/enums/enums");
const encryption_1 = require("../../common/encryption/encryption");
const userScheme = new mongoose_1.default.Schema({
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
        required: function () {
            return this.provider == "system" ? true : false;
        },
    },
    gender: {
        type: String,
        enum: [enums_1.GenderEnum.female, enums_1.GenderEnum.male],
        default: enums_1.GenderEnum.male,
    },
    role: {
        type: String,
        enum: [enums_1.RoleEnum.user, enums_1.RoleEnum.admin],
        default: enums_1.RoleEnum.user,
    },
    provider: {
        type: String,
        enum: [enums_1.providerEnum.google, enums_1.providerEnum.system],
        default: enums_1.providerEnum.system,
    },
    phone: String,
    profileImage: String,
    isConfirmed: Boolean,
}, {
    timestamps: true,
    strictQuery: true,
});
userScheme.pre("save", async function () {
    this.phone = (0, encryption_1.Encrypt)(this.phone);
});
const userModel = mongoose_1.default.models.User ||
    mongoose_1.default.model("User", userScheme);
exports.default = userModel;
function hashSync(password, arg1) {
    throw new Error("Function not implemented.");
}
function sendEmail(arg0) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=user.model.js.map