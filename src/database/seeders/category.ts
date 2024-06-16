import { faker } from "@faker-js/faker";
import { categoryRepository } from "../repository";
import Category from "../entities/category.entity";

async function seedCategories(length = 20) {
	const categoies = Array.from({ length }).map(() => {
		const category = new Category();
		category.title = faker.commerce.productName();
		category.description = faker.commerce.productDescription();
		category.imageUrl = faker.image.urlPicsumPhotos();
		return category;
	});
	await categoryRepository.save(categoies);
	console.log(`Seeded ${length} categoies successfully`);
}

export default seedCategories;
