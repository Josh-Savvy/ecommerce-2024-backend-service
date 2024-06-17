"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
// Entities
const user_entity_1 = __importDefault(require("./entities/user.entity"));
const product_entity_1 = __importDefault(require("./entities/product.entity"));
const auth_entity_1 = __importDefault(require("./entities/auth.entity"));
const category_entity_1 = __importDefault(require("./entities/category.entity"));
const order_entity_1 = __importDefault(require("./entities/order.entity"));
const seller_entity_1 = __importDefault(require("./entities/seller.entity"));
(0, dotenv_1.config)();
const dbConfig = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.NODE_ENV === "production",
    extra: process.env.NODE_ENV === "production" ? { ssl: { rejectUnauthorized: false } } : {},
    logging: !true,
    synchronize: true,
    entities: [user_entity_1.default, seller_entity_1.default, product_entity_1.default, auth_entity_1.default, category_entity_1.default, order_entity_1.default],
    // Todo: add cache option
};
const AppDataSource = new typeorm_1.DataSource(Object.assign({}, dbConfig));
exports.default = AppDataSource;
//# sourceMappingURL=index.js.map