
import { config } from "dotenv";
import e from "express";
import { resolve } from "node:path";

const NODE_ENV = process.env.NODE_ENV || "development";

const envPath = {
    development: ".env.development",
    production: ".env.production",
};

config({
    path: resolve(envPath[NODE_ENV as keyof typeof envPath])
});

export const PORT = Number(process.env.PORT) || 3000;
export const MONGO_URI = process.env.MONGO_URI!;
export const REDIS_URL = process.env.REDIS_URL!;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;