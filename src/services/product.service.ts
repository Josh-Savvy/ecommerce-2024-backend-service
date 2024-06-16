import { Product } from "../database/entities/product.entity";
import { CreateProductInput, UpdateProductInput } from "../interfaces/ProductInput";

export class ProductService {
	async createProduct(productData: CreateProductInput) {
		return productData;
		// return productRepository.createProduct(productData);
	}

	async getProductById(id: string) {
		// return productRepository.findOneOrFail(id);
		return {};
	}

	async updateProduct(id: string, productData: UpdateProductInput) {
		// return productRepository.updateProduct(id, productData);
		return {};
	}

	async deleteProduct(id: string): Promise<void> {
		// return productRepository.deleteProduct(id);
	}

	async getAllProducts(limit = 10, skip = 0) {
		// return productRepository.find();
		return [];
	}
}
