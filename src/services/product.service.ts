import { productRepository } from "../database/repository";
import { CreateProductInput, UpdateProductInput } from "../interfaces/ProductInput";
import cacheManager from "../lib/cache-manager";

export class ProductService {
	async createProduct(productData: CreateProductInput) {
		return productData;
		// return productRepository.createProduct(productData);
	}

	async getProductById(id: string) {
		const data = await productRepository.findOneOrFail({ where: { id } });
		return data;
	}

	async updateProduct(id: string, productData: UpdateProductInput) {
		// return productRepository.updateProduct(id, productData);
		return {};
	}

	async deleteProduct(id: string): Promise<void> {
		// return productRepository.deleteProduct(id);
	}

	async getAllProducts(limit = 10, skip = 0) {
		const cacheKey = `all-products?limit=${limit}-${skip}`;
		const cache = cacheManager.get(cacheKey);
		if (cache) return cache;
		const data = { page: 1, count: limit, data: await productRepository.find({ skip, take: limit }) };
		cacheManager.set(cacheKey, data, 86400 / 2);
		return data;
	}
}
