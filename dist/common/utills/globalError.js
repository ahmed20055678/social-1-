"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandling = exports.AppError = void 0;
class AppError extends Error {
    message;
    statusCode;
    constructor(message, statusCode = 500) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
const GlobalErrorHandling = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message,
        statusCode,
        stack: err.stack
    });
};
exports.GlobalErrorHandling = GlobalErrorHandling;
//# sourceMappingURL=globalError.js.map