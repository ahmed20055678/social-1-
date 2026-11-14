"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const globalError_1 = require("../utills/globalError");
const Validation = (schema) => {
    return (req, res, next) => {
        const ResultError = [];
        for (const key of Object.keys(schema)) {
            if (!schema[key])
                continue;
            const result = schema[key].safeParse(req[key]);
            if (!result.success) {
                ResultError.push(...result.error.issues);
            }
        }
        if (ResultError.length > 0) {
            return next(new globalError_1.AppError(JSON.stringify(ResultError), 400));
        }
        next();
    };
};
exports.Validation = Validation;
//# sourceMappingURL=validation.js.map