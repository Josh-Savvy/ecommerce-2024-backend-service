"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const celebrate_1 = require("celebrate");
const validation_schema_1 = require("../util/validation-schema");
const categoryController = new category_controller_1.default();
const categoryRoute = (0, express_1.Router)();
categoryRoute.get("/", (0, celebrate_1.celebrate)({ query: validation_schema_1.LimitAndSkipQuerySchema }), (0, express_async_handler_1.default)(async (req, res) => {
    const { skip, limit } = req.query;
    const data = await categoryController.getAllCategories(skip, limit);
    res.status(200).json(data);
}));
categoryRoute.get("/:categoryId", (0, celebrate_1.celebrate)({ params: celebrate_1.Joi.object({ categoryId: (0, validation_schema_1.resourceIdSchema)("categoryId") }) }), (0, express_async_handler_1.default)(async (req, res) => {
    const categoryId = req.params.categoryId;
    const data = await categoryController.getCategoryById(categoryId);
    res.status(200).json(data);
}));
exports.default = categoryRoute;
//# sourceMappingURL=category.route.js.map