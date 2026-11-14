"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = Hash;
exports.CompareHash = CompareHash;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function Hash(password, SALT_ROUNDS = 10) {
    return await bcrypt_1.default.hash(password, SALT_ROUNDS);
}
async function CompareHash(password, hashedPassword) {
    return await bcrypt_1.default.compare(password, hashedPassword);
}
//# sourceMappingURL=hash.js.map