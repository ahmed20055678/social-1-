import { type NextFunction, type Request, type Response } from 'express';
declare class authcontroller {
    constructor();
    singup: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    singin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    signupeWithGmail: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    forgetPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    reseatPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
declare const _default: authcontroller;
export default _default;
//# sourceMappingURL=auth.controller.d.ts.map