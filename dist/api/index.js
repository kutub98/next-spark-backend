"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const server_1 = __importDefault(require("../dist/server")); // Adjusted path to compiled output
const serverless_http_1 = __importDefault(require("serverless-http"));
const handler = (0, serverless_http_1.default)(server_1.default);
exports.default = handler;
exports.config = {
    api: { bodyParser: false },
};
