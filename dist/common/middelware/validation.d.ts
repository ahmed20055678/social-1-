import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
type ReqType = keyof Request;
type SchemaType = Partial<Record<ReqType, ZodType>>;
export declare const Validation: (schema: SchemaType) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validation.d.ts.map