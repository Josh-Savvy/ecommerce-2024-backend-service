import CategoryService from "../services/category.service";

export default class CategoryController {
	private categoryService = new CategoryService();

	async getAllCategories(skip = 0, limit = 10) {
		try {
			return await this.categoryService.getAllCategories(skip, limit);
		} catch (error) {
			console.log({ error });
			throw error;
		}
	}

	async getCategoryById(id: string) {
		try {
			return await this.categoryService.getCategoryById(id);
		} catch (error) {
			console.log({ error });
			throw error;
		}
	}
}
