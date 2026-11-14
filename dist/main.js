"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = require("express-rate-limit");
const globalError_1 = require("./common/utills/globalError");
const auth_route_1 = __importDefault(require("./module/auth/auth.route"));
const connection_1 = __importDefault(require("./DB/connection"));
const redis_connection_1 = __importDefault(require("./DB/redis.connection"));
const Limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 5 * 60 * 1000,
    limit: 20,
    message: {
        message: "Too many requests"
    }
});
const app = (0, express_1.default)();
(0, connection_1.default)();
redis_connection_1.default.connect();
app.use(express_1.default.json());
app.use(Limiter);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use("/auth", auth_route_1.default);
app.use(globalError_1.GlobalErrorHandling);
app.listen(config_1.PORT, () => {
    console.log(`Server Running on port ${config_1.PORT}`);
});
//# sourceMappingURL=main.js.map