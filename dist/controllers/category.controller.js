"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../database/repository");
const cache_manager_1 = __importDefault(require("../lib/cache-manager"));
class CategoryController {
    async getAllCategories(skip = 10, limit = 0) {
        const cacheKey = `all-categories-${skip}-${limit}`;
        const cache = cache_manager_1.default.get(cacheKey);
        if (cache)
            return cache;
        const data = {
            page: 1,
            count: limit,
            data: await repository_1.categoryRepository.find({ skip, take: limit, relations: ["products"] }),
        };
        cache_manager_1.default.set(cache, data, 86400 / 3);
        return data;
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category.controller.js.map