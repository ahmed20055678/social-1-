import { type NextFunction, type Request, type Response } from 'express';
export declare class AppError extends Error {
    message: any;
    statusCode: number;
    constructor(message: any, statusCode?: number);
}
export declare const GlobalErrorHandling: (err: AppError, req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=globalError.d.ts.map