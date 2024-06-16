"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRepository = exports.categoryRepository = exports.productRepository = exports.otpRepository = exports.userRepository = void 0;
const _1 = __importDefault(require("."));
const auth_entity_1 = __importDefault(require("./entities/auth.entity"));
const category_entity_1 = __importDefault(require("./entities/category.entity"));
const order_entity_1 = __importDefault(require("./entities/order.entity"));
const product_entity_1 = __importDefault(require("./entities/product.entity"));
const user_entity_1 = __importDefault(require("./entities/user.entity"));
exports.userRepository = _1.default.getRepository(user_entity_1.default);
exports.otpRepository = _1.default.getRepository(auth_entity_1.default);
exports.productRepository = _1.default.getRepository(product_entity_1.default);
exports.categoryRepository = _1.default.getRepository(category_entity_1.default);
exports.orderRepository = _1.default.getRepository(order_entity_1.default);
//# sourceMappingURL=repository.js.map