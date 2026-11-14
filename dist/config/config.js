"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.REDIS_URL = exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
const node_path_1 = require("node:path");
const NODE_ENV = process.env.NODE_ENV || "development";
const envPath = {
    development: ".env.development",
    production: ".env.production",
};
(0, dotenv_1.config)({
    path: (0, node_path_1.resolve)(envPath[NODE_ENV])
});
exports.PORT = Number(process.env.PORT) || 3000;
exports.MONGO_URI = process.env.MONGO_URI;
exports.REDIS_URL = process.env.REDIS_URL;
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
//# sourceMappingURL=config.js.map