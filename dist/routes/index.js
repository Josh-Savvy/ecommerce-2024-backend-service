"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const product_route_1 = __importDefault(require("./product.route"));
const user_route_1 = __importDefault(require("./user.route"));
const category_route_1 = __importDefault(require("./category.route"));
const routes = (0, express_1.Router)();
routes.get("/", (req, res) => {
    res.json({ message: "Server is healthy", your_ip_addr: req.ip || req.ips });
});
routes.use("/auth", auth_route_1.default);
routes.use("/users", user_route_1.default);
routes.use("/products", product_route_1.default);
routes.use("/categories", category_route_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map