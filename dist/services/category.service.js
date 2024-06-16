"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../database/repository");
const cache_manager_1 = __importDefault(require("../lib/cache-manager"));
const error_handler_1 = require("../middlewares/error-handler");
class CategoryService {
    async getAllCategories(skip = 0, limit = 10) {
        const cacheKey = `all-categories-${skip}-${limit}`;
        const cache = cache_manager_1.default.get(cacheKey);
        if (cache)
            return cache;
        const data = {
            page: 1,
            count: limit,
            data: await repository_1.categoryRepository.find({ skip, take: limit }),
        };
        cache_manager_1.default.set(cache, data, 86400 / 3);
        return data;
    }
    async getCategoryById(id) {
        const cacheKey = `get-category-${id}`;
        const cache = cache_manager_1.default.get(cacheKey);
        // if (cache) return cache;
        if (!id)
            throw (0, error_handler_1.badRequestException)("Invalid categoryId");
        const category = await repository_1.categoryRepository.findOne({ where: { id }, relations: ["products"] });
        if (!category)
            throw (0, error_handler_1.badRequestException)("category not found");
        cache_manager_1.default.set(cache, category, 86400 / 3);
        return category;
    }
}
exports.default = CategoryService;
//# sourceMappingURL=category.service.js.map