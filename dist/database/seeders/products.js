"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const repository_1 = require("../repository");
const product_entity_1 = __importDefault(require("../entities/product.entity"));
async function seedProducts(numberOfProducts = 50) {
    const categories = await repository_1.categoryRepository.find();
    const products = Array.from({ length: numberOfProducts }).map(() => {
        const product = new product_entity_1.default();
        product.title = faker_1.faker.commerce.productName();
        product.description = faker_1.faker.commerce.productDescription();
        product.price = parseFloat(faker_1.faker.commerce.price());
        product.quantity = faker_1.faker.number.int({ min: 0, max: 100 });
        product.images = [];
        for (let i = 0; i < 3; i++)
            product.images.push({ id: faker_1.faker.string.uuid(), url: faker_1.faker.image.urlPicsumPhotos() });
        // Assign a random category to each product
        const randomCategory = faker_1.faker.helpers.arrayElement(categories);
        product.category = randomCategory;
        return product;
    });
    await repository_1.productRepository.save(products);
    console.log(`Seeded ${numberOfProducts} products successfully`);
}
exports.default = seedProducts;
//# sourceMappingURL=products.js.map