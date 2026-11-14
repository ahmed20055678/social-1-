import bcrypt from "bcrypt";

export async function Hash(password: string, SALT_ROUNDS = 10) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function CompareHash(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}

