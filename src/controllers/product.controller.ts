import { CreateProductInput, UpdateProductInput } from "../interfaces/ProductInput";
import { ProductService } from "../services/product.service";

export class ProductController {
	private productService = new ProductService();

	async createProduct(input: CreateProductInput) {
		try {
			return await this.productService.createProduct(input);
		} catch (error) {
			console.log({ error });
			throw error;
		}
	}

	async getProductById(id: string) {
		try {
			return await this.productService.getProductById(id);
		} catch (error) {
			console.log({ error });
			throw error;
		}
	}

	async updateProduct(id: string, input: UpdateProductInput) {
		try {
			return await this.productService.updateProduct(id, input);
		} catch (error) {
			console.log({ error });
			throw error;
		}
	}

	async deleteProduct(id: string) {
		try {
			return await this.productService.deleteProduct(id);
		} catch (error) {
			console.log({ error });
			throw error;
		}
	}

	async getAllProducts(limit = 10, skip = 0) {
		try {
			return await this.productService.getAllProducts(limit, skip);
		} catch (error) {
			console.log({ error });
			throw error;
		}
	}
}
