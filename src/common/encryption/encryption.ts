
import crypto from "node:crypto";

const ENCRYPTION_KEY = Buffer.from("1345984565554644856qw4d6w5@!@#QE");
const IV_LENGTH = 16;
if (ENCRYPTION_KEY.length !== 32) {
    throw new Error("Encryption key must be 32 bytes");
}

export function Encrypt(plainText: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        ENCRYPTION_KEY,
        iv
    );

    let encrypted = cipher.update(plainText, "utf8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
}

export function Decrypt(text: string): string {
    const [ivHex, encryptedText] = text.split(":");

    if (!ivHex || !encryptedText) {
        throw new Error("Invalid encrypted text");
    }

    const iv = Buffer.from(ivHex, "hex");

    if (iv.length !== IV_LENGTH) {
        throw new Error("Invalid IV length");
    }

    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        ENCRYPTION_KEY,
        iv
    );

    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}
