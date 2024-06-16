"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = __importDefault(require("../database/entities/order.entity"));
const repository_1 = require("../database/repository");
class OrderService {
    async createOrder(user, productIds, notes) {
        const products = await repository_1.productRepository.find({ where: { id: (0, typeorm_1.In)([productIds]) } });
        if (products.length !== productIds.length)
            throw new Error("Some products not found");
        const order = new order_entity_1.default();
        order.user = user;
        if (notes)
            order.notes = notes;
        await repository_1.orderRepository.save(order);
        return order;
    }
    async getOrderById(id) {
        return await repository_1.orderRepository.findOneOrFail({ where: { orderNumber: id } });
    }
    async getUserOrders(userId) {
        return await repository_1.orderRepository.findBy({ user: { id: userId } });
    }
    async updateOrder(id, updateOrder) {
        return await repository_1.orderRepository.update(id, updateOrder);
    }
    async deleteOrder(id) {
        await repository_1.orderRepository.delete(id);
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map