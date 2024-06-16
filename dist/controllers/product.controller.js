"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
class ProductController {
    constructor() {
        this.productService = new product_service_1.ProductService();
    }
    async createProduct(input) {
        try {
            return await this.productService.createProduct(input);
        }
        catch (error) {
            console.log({ error });
            throw error;
        }
    }
    async getProductById(id) {
        try {
            return await this.productService.getProductById(id);
        }
        catch (error) {
            console.log({ error });
            throw error;
        }
    }
    async updateProduct(id, input) {
        try {
            return await this.productService.updateProduct(id, input);
        }
        catch (error) {
            console.log({ error });
            throw error;
        }
    }
    async deleteProduct(id) {
        try {
            return await this.productService.deleteProduct(id);
        }
        catch (error) {
            console.log({ error });
            throw error;
        }
    }
    async getAllProducts(limit = 10, skip = 0) {
        try {
            return await this.productService.getAllProducts(limit, skip);
        }
        catch (error) {
            console.log({ error });
            throw error;
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map