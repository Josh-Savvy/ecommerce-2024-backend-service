import { productRepository } from "../database/repository";
import { CreateProductInput, UpdateProductInput } from "../interfaces/ProductInput";
import cacheManager from "../lib/cache-manager";
import { badRequestException } from "../middlewares/error-handler";

export class ProductService {
	async createProduct(productData: CreateProductInput) {
		return productData;
		// return productRepository.createProduct(productData);
	}

	async getProductById(id: string) {
		if (!id || id == undefined) throw badRequestException("invalid product id");
		const cacheKey = `get-product-${id}`;
		const cache = cacheManager.get(cacheKey);
		if (cache) return cache;
		const data = await productRepository.findOne({ where: { id } });
		if (!data) throw badRequestException("Product not found");
		cacheManager.set(cacheKey, data);
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
		const data = {
			page: 1,
			count: limit,
			data: await productRepository.find({ skip, take: limit, relations: ["category"] }),
		};
		cacheManager.set(cacheKey, data, 86400 / 2);
		return data;
	}

	// Todo: get similar products
}
