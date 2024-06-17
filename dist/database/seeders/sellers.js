"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const repository_1 = require("../repository");
const seller_entity_1 = __importDefault(require("../entities/seller.entity"));
async function seedSellers(length = 10) {
    try {
        const users = await repository_1.userRepository.find();
        const usedUsers = new Set();
        const sellers = [];
        for (let i = 0; i < length; i++) {
            let randomUser;
            do {
                randomUser = faker_1.faker.helpers.arrayElement(users);
            } while (usedUsers.has(randomUser.id));
            usedUsers.add(randomUser.id);
            const sellerProfile = new seller_entity_1.default();
            sellerProfile.user = randomUser;
            sellers.push(sellerProfile);
        }
        await repository_1.sellerRepository.save(sellers);
        console.log(`Seeded ${length} sellers successfully`);
    }
    catch (error) {
        console.log("Error seeding sellers:", error);
    }
}
exports.default = seedSellers;
//# sourceMappingURL=sellers.js.map