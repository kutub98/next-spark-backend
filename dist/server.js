"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
if (config_1.default.database_url) {
    mongoose_1.default
        .connect(config_1.default.database_url)
        .then(() => {
        console.log('Database connected successfully');
    })
        .catch((err) => {
        console.error('Failed to connect to database:', err);
        // Optionally, allow the app to continue running without DB
    });
}
else {
    console.log('No DATABASE_URL provided, skipping database connection');
}
exports.default = app_1.default;
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optionally, exit the process or handle gracefully
});
