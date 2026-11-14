"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = Encrypt;
exports.Decrypt = Decrypt;
const node_crypto_1 = __importDefault(require("node:crypto"));
const ENCRYPTION_KEY = Buffer.from("1345984565554644856qw4d6w5@!@#QE");
const IV_LENGTH = 16;
if (ENCRYPTION_KEY.length !== 32) {
    throw new Error("Encryption key must be 32 bytes");
}
function Encrypt(plainText) {
    const iv = node_crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = node_crypto_1.default.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(plainText, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
}
function Decrypt(text) {
    const [ivHex, encryptedText] = text.split(":");
    if (!ivHex || !encryptedText) {
        throw new Error("Invalid encrypted text");
    }
    const iv = Buffer.from(ivHex, "hex");
    if (iv.length !== IV_LENGTH) {
        throw new Error("Invalid IV length");
    }
    const decipher = node_crypto_1.default.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
//# sourceMappingURL=encryption.js.map