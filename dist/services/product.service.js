"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const repository_1 = require("../database/repository");
const cache_manager_1 = __importDefault(require("../lib/cache-manager"));
const error_handler_1 = require("../middlewares/error-handler");
class ProductService {
    async createProduct(productData) {
        return productData;
        // return productRepository.createProduct(productData);
    }
    async getProductById(id) {
        if (!id || id == undefined)
            throw (0, error_handler_1.badRequestException)("invalid product id");
        const cacheKey = `get-product-${id}`;
        const cache = cache_manager_1.default.get(cacheKey);
        if (cache)
            return cache;
        const data = await repository_1.productRepository.findOne({ where: { id } });
        if (!data)
            throw (0, error_handler_1.badRequestException)("Product not found");
        cache_manager_1.default.set(cacheKey, data);
        return data;
    }
    async updateProduct(id, productData) {
        // return productRepository.updateProduct(id, productData);
        return {};
    }
    async deleteProduct(id) {
        // return productRepository.deleteProduct(id);
    }
    async getAllProducts(limit = 10, skip = 0) {
        const cacheKey = `all-products?limit=${limit}-${skip}`;
        const cache = cache_manager_1.default.get(cacheKey);
        if (cache)
            return cache;
        const data = {
            page: 1,
            count: limit,
            data: await repository_1.productRepository.find({ skip, take: limit, relations: ["category"] }),
        };
        cache_manager_1.default.set(cacheKey, data, 86400 / 2);
        return data;
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map