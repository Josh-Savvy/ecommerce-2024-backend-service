"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../database/repository");
const user_entity_1 = __importDefault(require("../database/entities/user.entity"));
const string_helper_1 = __importDefault(require("../helpers/string.helper"));
class UserService {
    async create(input) {
        const { email, password } = input;
        let user = new user_entity_1.default();
        user.username = string_helper_1.default.generateRandomString();
        user.email = email;
        user.password = password;
        user = await repository_1.userRepository.save(user);
        return user;
    }
    async findOneByEmail(email) {
        return await repository_1.userRepository.findOne({
            where: { email },
            // relations:["order"]
        });
    }
    async currentUser(userId) {
        return await repository_1.userRepository.findOne({
            where: { id: userId },
            // relations:["order"]
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map