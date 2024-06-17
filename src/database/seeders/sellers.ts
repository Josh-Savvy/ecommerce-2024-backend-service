import { faker } from "@faker-js/faker";
import { sellerRepository, userRepository } from "../repository";
import Seller from "../entities/seller.entity";

async function seedSellers(length = 10) {
	try {
		const users = await userRepository.find();
		const usedUsers = new Set<string>();
		const sellers: Seller[] = [];

		for (let i = 0; i < length; i++) {
			let randomUser;
			do {
				randomUser = faker.helpers.arrayElement(users);
			} while (usedUsers.has(randomUser.id));
			usedUsers.add(randomUser.id);
			const sellerProfile = new Seller();
			sellerProfile.user = randomUser;
			sellers.push(sellerProfile);
		}
		await sellerRepository.save(sellers);
		console.log(`Seeded ${length} sellers successfully`);
	} catch (error) {
		console.log("Error seeding sellers:", error);
	}
}

export default seedSellers;
