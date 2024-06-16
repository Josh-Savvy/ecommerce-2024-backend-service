"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const celebrate_1 = require("celebrate");
const validation_schema_1 = require("../util/validation-schema");
const authRoutes = (0, express_1.Router)();
const authController = new auth_controller_1.default();
authRoutes.post("/sign-up", (0, celebrate_1.celebrate)({ body: validation_schema_1.createUserSchema }), (0, express_async_handler_1.default)(async (req, res) => {
    const data = await authController.register(req.body);
    res.status(201).json(Object.assign({ message: "User created successfully" }, data));
}));
authRoutes.post("/sign-in", (0, celebrate_1.celebrate)({ body: validation_schema_1.loginSchema }), (0, express_async_handler_1.default)(async (req, res) => {
    const data = await authController.login(req.body);
    res.status(200).json(data);
}));
exports.default = authRoutes;
//# sourceMappingURL=auth.route.js.map