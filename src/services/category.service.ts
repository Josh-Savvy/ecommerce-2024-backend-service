import { categoryRepository } from "../database/repository";
import cacheManager from "../lib/cache-manager";
import { badRequestException } from "../middlewares/error-handler";

export default class CategoryService {
	async getAllCategories(skip = 0, limit = 10) {
		const cacheKey = `all-categories-${skip}-${limit}`;
		const cache = cacheManager.get(cacheKey);
		if (cache) return cache;
		const data = {
			page: 1,
			count: limit,
			data: await categoryRepository.find({ skip, take: limit }),
		};
		cacheManager.set(cache, data, 86400 / 3);
		return data;
	}

	async getCategoryById(id: string) {
		const cacheKey = `get-category-${id}`;
		const cache = cacheManager.get(cacheKey);
		// if (cache) return cache;
		if (!id) throw badRequestException("Invalid categoryId");
		const category = await categoryRepository.findOne({ where: { id }, relations: ["products"] });
		if (!category) throw badRequestException("category not found");
		cacheManager.set(cache, category, 86400 / 3);
		return category;
	}
}
