"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../DB/model/user.model"));
const repository_1 = __importDefault(require("../../DB/repository/repository"));
class UserRepository extends repository_1.default {
    constructor() {
        super(user_model_1.default);
    }
    findUserByEmail = async (email, options) => {
        return await this.findOne({
            filter: {
                email,
                ...(options?.isConfirmed !== undefined && {
                    isConfirmed: options.isConfirmed
                })
            }
        });
    };
    createUser = async (data) => {
        return await this.create(data);
    };
    findUserById = async (id) => {
        return await this.findById({ id });
    };
    updateUser = async (id, updateQuery) => {
        return await this.findByIdAndUpdate({
            id,
            update: { $set: updateQuery }
        });
    };
    updateUserByEmail = async (email, value) => {
        return await this.findOneAndUpdate({
            filter: { email },
            update: { $set: value }
        });
    };
}
exports.default = new UserRepository();
//# sourceMappingURL=auth.res.js.map