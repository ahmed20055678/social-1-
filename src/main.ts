import express, { NextFunction, Request, Response } from "express";
import { PORT } from "./config/config";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { GlobalErrorHandling } from "./common/utills/globalError";
import authRouter from "./module/auth/auth.route";
import ConnectionDB from "./DB/connection";
import  RedisService  from "./DB/redis.connection";

const Limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 20,
    message: {
        message: "Too many requests"
    }
});

const app = express();
ConnectionDB()
RedisService.connect()
app.use(express.json());
app.use(Limiter);
app.use(helmet());
app.use(cors());
app.use("/auth", authRouter);
app.use(GlobalErrorHandling);
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});