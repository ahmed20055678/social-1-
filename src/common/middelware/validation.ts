import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { AppError } from "../utills/globalError";

type ReqType = keyof Request;
type SchemaType = Partial<Record<ReqType, ZodType>>;

export const Validation = (schema: SchemaType) => {

    return (req: Request, res: Response, next: NextFunction) => {

        const ResultError = [];

        for (const key of Object.keys(schema) as ReqType[]) {

            if (!schema[key]) continue;

            const result = schema[key].safeParse(req[key]);

            if (!result.success) {
                ResultError.push(...result.error.issues);
            }
        }

        if (ResultError.length > 0) {
            return next(new AppError(JSON.stringify(ResultError), 400));
        }

        next();
    };
};