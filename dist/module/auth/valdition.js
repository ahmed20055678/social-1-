"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.reseatPasswordSchema = exports.refreshTokenSchema = exports.signUpSchema = void 0;
const z = __importStar(require("zod"));
const enums_1 = require("../../common/enums/enums");
exports.signUpSchema = {
    body: z.strictObject({
        fName: z.string().min(3).max(20).trim(),
        lName: z.string().min(3).max(20).trim(),
        email: z.string().email(),
        password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        Cpassword: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        gender: z.enum(enums_1.GenderEnum).optional(),
        role: z.enum(enums_1.RoleEnum).optional(),
        phone: z.string()
    }).superRefine((data, ctx) => {
        if (data.password !== data.Cpassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
            });
        }
    }),
};
exports.refreshTokenSchema = {
    headers: z.object({
        token: z.string().min(1, "Token is required"),
        connection: z.string().optional(),
        "accept-encoding": z.string().optional(),
        accept: z.string().optional(),
        "user-agent": z.string().optional(),
        host: z.string().optional(),
        "content-length": z.string().optional(),
        "postman-token": z.string().optional(),
        "cache-control": z.string().optional()
    }).passthrough()
};
exports.reseatPasswordSchema = {
    body: z.strictObject({
        email: z.string().email(),
        code: z.string().regex(/^[0-9]{6}$/),
        password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        Cpassword: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    }).superRefine((data, ctx) => {
        if (data.password !== data.Cpassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
            });
        }
    })
};
//# sourceMappingURL=valdition.js.map