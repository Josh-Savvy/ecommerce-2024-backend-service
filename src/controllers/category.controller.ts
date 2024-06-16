import { count } from "console";
import { categoryRepository } from "../database/repository";
import cacheManager from "../lib/cache-manager";

export default class CategoryController {
	async getAllCategories(skip = 10, limit = 0) {
		const cacheKey = `all-categories-${skip}-${limit}`;
		const cache = cacheManager.get(cacheKey);
		if (cache) return cache;
		const data = {
			page: 1,
			count: limit,
			data: await categoryRepository.find({ skip, take: limit, relations: ["products"] }),
		};
		cacheManager.set(cache, data, 86400 / 3);
		return data;
	}
}
