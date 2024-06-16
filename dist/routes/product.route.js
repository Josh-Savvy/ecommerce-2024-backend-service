"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const product_controller_1 = require("../controllers/product.controller");
const celebrate_1 = require("celebrate");
const validation_schema_1 = require("../util/validation-schema");
const productsRoute = (0, express_1.Router)();
const productsController = new product_controller_1.ProductController();
productsRoute.post("/", 
// todo: input validation
(0, express_async_handler_1.default)(async (req, res) => {
    const data = await productsController.createProduct(req.body);
    res.status(201).json({ messsage: "Product created successfully", data });
}));
productsRoute.get("/:productId", (0, celebrate_1.celebrate)({ params: celebrate_1.Joi.object({ productId: (0, validation_schema_1.resourceIdSchema)("productId") }) }), (0, express_async_handler_1.default)(async (req, res) => {
    const data = await productsController.getProductById(req.params.productId);
    res.status(200).json(Object.assign({}, data));
}));
productsRoute.put("/:productId", (0, celebrate_1.celebrate)({ params: celebrate_1.Joi.object({ productId: (0, validation_schema_1.resourceIdSchema)("productId") }) }), (0, express_async_handler_1.default)(async (req, res) => {
    const data = await productsController.updateProduct(req.params.id, req.body);
    res.status(200).json(Object.assign({}, data));
}));
productsRoute.delete("/:productId", (0, celebrate_1.celebrate)({ params: celebrate_1.Joi.object({ productId: (0, validation_schema_1.resourceIdSchema)("productId") }) }), (0, express_async_handler_1.default)(async (req, res) => {
    await productsController.deleteProduct(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
}));
productsRoute.get("/", (0, celebrate_1.celebrate)({ query: validation_schema_1.LimitAndSkipQuerySchema }), (0, express_async_handler_1.default)(async (req, res) => {
    let params = req.query;
    const data = await productsController.getAllProducts(params.limit, params.skip);
    res.status(200).json(data);
}));
exports.default = productsRoute;
//# sourceMappingURL=product.route.js.map