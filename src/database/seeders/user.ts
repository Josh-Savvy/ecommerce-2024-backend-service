import { faker } from "@faker-js/faker";
import { userRepository } from "../repository";
import User, { UserRole } from "../entities/user.entity";
import StringHelper from "../../helpers/string.helper";

async function seedUsers(length = 20) {
	try {
		const users = Array.from({ length }).map(() => {
			const user = new User();
			user.firstName = faker.person.firstName();
			user.lastName = faker.person.lastName();
			user.username = StringHelper.generateRandomString();
			user.avatar = faker.image.avatar();
			user.email = faker.internet.email({ firstName: user.firstName, allowSpecialCharacters: true });
			user.password = faker.system.networkInterface();
			user.hashPassword();
			return user;
		});
		await userRepository.save(users);
		console.log(`Seeded ${length} users successfully`);
	} catch (error) {
		console.log("Error seeding users:", error);
	}
}

export default seedUsers;
