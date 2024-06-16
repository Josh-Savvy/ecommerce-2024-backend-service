"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const repository_1 = require("../repository");
const category_entity_1 = __importDefault(require("../entities/category.entity"));
async function seedCategories(length = 20) {
    const categoies = Array.from({ length }).map(() => {
        const category = new category_entity_1.default();
        category.title = faker_1.faker.commerce.productName();
        category.description = faker_1.faker.commerce.productDescription();
        category.imageUrl = faker_1.faker.image.urlPicsumPhotos();
        return category;
    });
    await repository_1.categoryRepository.save(categoies);
    console.log(`Seeded ${length} categoies successfully`);
}
exports.default = seedCategories;
//# sourceMappingURL=category.js.map