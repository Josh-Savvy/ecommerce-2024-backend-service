"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = __importDefault(require("../services/category.service"));
class CategoryController {
    constructor() {
        this.categoryService = new category_service_1.default();
    }
    async getAllCategories(skip = 0, limit = 10) {
        try {
            return await this.categoryService.getAllCategories(skip, limit);
        }
        catch (error) {
            console.log({ error });
            throw error;
        }
    }
    async getCategoryById(id) {
        try {
            return await this.categoryService.getCategoryById(id);
        }
        catch (error) {
            console.log({ error });
            throw error;
        }
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category.controller.js.map