import { faker } from "@faker-js/faker";
import { categoryRepository, productRepository, userRepository } from "../repository";
import Product from "../entities/product.entity";

async function seedProducts(numberOfProducts = 50) {
	try {
		const categories = await categoryRepository.find();
		const users = await userRepository.find();
		const products = Array.from({ length: numberOfProducts }).map(() => {
			const product = new Product();
			product.title = faker.commerce.productName();
			product.description = faker.commerce.productDescription();
			product.price = parseFloat(faker.commerce.price());
			product.quantity = faker.number.int({ min: 0, max: 100 });
			product.images = [];
			for (let i = 0; i < 3; i++)
				product.images.push({ id: faker.string.uuid(), url: faker.image.urlPicsumPhotos() });
			// Assign a random category to each product
			const randomCategory = faker.helpers.arrayElement(categories);
			product.category = randomCategory;
			// Assign a random user to each product
			const randomUser = faker.helpers.arrayElement(users);
			product.seller = randomUser;
			return product;
		});
		await productRepository.save(products);
		console.log(`Seeded ${numberOfProducts} products successfully`);
	} catch (error) {
		console.log("Error seeding products:", error);
	}
}

export default seedProducts;
