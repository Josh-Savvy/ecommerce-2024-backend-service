import { faker } from "@faker-js/faker";
import { categoryRepository } from "../repository";
import Category from "../entities/category.entity";

async function seedCategories(length = 20) {
	try {
		const categories = Array.from({ length }).map(() => {
			const category = new Category();
			category.title = `${faker.commerce.productAdjective()}-${faker.commerce.product()}`;
			category.description = faker.commerce.productDescription();
			category.imageUrl = faker.image.urlPicsumPhotos();
			return category;
		});
		await categoryRepository.save(categories);
		console.log(`Seeded ${length} categories successfully`);
	} catch (error) {
		console.log("Error seeding categories:", error);
	}
}

export default seedCategories;
