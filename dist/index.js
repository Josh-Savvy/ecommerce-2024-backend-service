"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = __importDefault(require("./middlewares/error-handler"));
const helmet_1 = require("helmet");
const database_1 = __importDefault(require("./database"));
const http_1 = __importDefault(require("http"));
const products_1 = __importDefault(require("./database/seeders/products"));
const morgan_1 = __importDefault(require("morgan"));
const category_1 = __importDefault(require("./database/seeders/category"));
const user_1 = __importDefault(require("./database/seeders/user"));
const sellers_1 = __importDefault(require("./database/seeders/sellers"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.set("trust proxy", true);
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({ limit: "5mb" }))
    .use(express_1.default.urlencoded({ extended: true, limit: "5mb" }))
    .use((0, cors_1.default)({ origin: "*" }))
    .use((0, helmet_1.xssFilter)())
    // todo: rate limiter
    // todo: api documentation middleware
    .use(routes_1.default);
app.use(error_handler_1.default);
// capture all 404 errors
app.use(function (request, response) {
    // Todo: logger
    response.status(404).json({ message: "Route not found", path: request.path }).end();
});
process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.error(err);
    console.error(err.name, err.message);
    process.exit(1);
});
const server = http_1.default.createServer(app);
// Start server
database_1.default.initialize()
    .then(async () => {
    console.log("Database connected.");
    if (process.env.RUN_SEEDERS == "true") {
        await (0, user_1.default)();
        await (0, sellers_1.default)();
        await (0, category_1.default)(10);
        await (0, products_1.default)();
        // Other seeders
    }
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((error) => console.error("Database connection error: ", error));
//# sourceMappingURL=index.js.map