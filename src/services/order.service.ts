import { In } from "typeorm";
import Order from "../database/entities/order.entity";
import User from "../database/entities/user.entity";
import { orderRepository, productRepository } from "../database/repository";

export class OrderService {
	async createOrder(user: User, productIds: string[], notes?: string) {
		const products = await productRepository.find({ where: { id: In([productIds]) } });
		if (products.length !== productIds.length) throw new Error("Some products not found");
		const order = new Order();
		order.user = user;
		if (notes) order.notes = notes;
		await orderRepository.save(order);
		return order;
	}

	async getOrderById(id: string) {
		return await orderRepository.findOneOrFail({ where: { orderNumber: id } });
	}

	async getUserOrders(userId: string): Promise<Order[]> {
		return await orderRepository.findBy({ user: { id: userId } });
	}

	async updateOrder(id: string, updateOrder: Partial<Order>) {
		return await orderRepository.update(id, updateOrder);
	}

	async deleteOrder(id: string): Promise<void> {
		await orderRepository.delete(id);
	}
}
