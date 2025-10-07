"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
// Connect to MongoDB only if DATABASE_URL is available
if (config_1.default.database_url) {
    mongoose_1.default
        .connect(config_1.default.database_url)
        .then(() => console.log('✅ Database connected'))
        .catch((err) => console.error('❌ DB connection failed:', err));
}
else {
    console.log('No DATABASE_URL provided, skipping database connection');
}
const PORT = config_1.default.port || 5000;
if (!process.env.VERCEL) {
    app_1.default.listen(PORT, () => {
        console.log(`🚀 Server running locally on http://localhost:${PORT}`);
    });
}
// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optionally, exit the process to prevent hanging (not recommended for Vercel)
    // process.exit(1);
});
// Export the app for Vercel
exports.default = app_1.default;
