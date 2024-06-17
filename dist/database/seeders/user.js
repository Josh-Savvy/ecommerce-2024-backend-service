"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const repository_1 = require("../repository");
const user_entity_1 = __importDefault(require("../entities/user.entity"));
const string_helper_1 = __importDefault(require("../../helpers/string.helper"));
async function seedUsers(length = 20) {
    try {
        const users = Array.from({ length }).map(() => {
            const user = new user_entity_1.default();
            user.firstName = faker_1.faker.person.firstName();
            user.lastName = faker_1.faker.person.lastName();
            user.username = string_helper_1.default.generateRandomString();
            user.avatar = faker_1.faker.image.avatar();
            user.email = faker_1.faker.internet.email({ firstName: user.firstName, allowSpecialCharacters: true });
            user.password = faker_1.faker.system.networkInterface();
            user.hashPassword();
            return user;
        });
        await repository_1.userRepository.save(users);
        console.log(`Seeded ${length} users successfully`);
    }
    catch (error) {
        console.log("Error seeding users:", error);
    }
}
exports.default = seedUsers;
//# sourceMappingURL=user.js.map