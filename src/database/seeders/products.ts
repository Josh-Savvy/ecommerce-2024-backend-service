import { createConnection, getRepository } from "typeorm";
import { faker } from "@faker-js/faker";
import AppDataSource from "..";
import { productRepository } from "../repository";
import { Product } from "../entities/product.entity";

async function seedProducts(numberOfProducts = 50) {
	const products = Array.from({ length: numberOfProducts }).map(() => {
		const product = new Product();
		product.title = faker.commerce.productName();
		product.description = faker.commerce.productDescription();
		product.price = parseFloat(faker.commerce.price());
		product.quantity = faker.number.int({ min: 0, max: 100 });
		product.images = [];
		for (let i = 0; i < 1; i++) product.images.push({ id: faker.string.uuid(), url: faker.image.imageUrl() });
		return product;
	});
	await productRepository.save(products);
	console.log(`Seeded ${numberOfProducts} products successfully`);
}

export default seedProducts;
