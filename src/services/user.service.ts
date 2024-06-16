import CreateUserInput from "../interfaces/CreateUserInput";
import { userRepository } from "../database/repository";
import User from "../database/entities/user.entity";
import StringHelper from "../helpers/string.helper";

export default class UserService {
	async create(input: CreateUserInput) {
		const { email, password } = input;
		let user = new User();
		user.username = StringHelper.generateRandomString();
		user.email = email;
		user.password = password;
		user = await userRepository.save(user);
		return user;
	}

	async findOneByEmail(email: string) {
		return await userRepository.findOne({
			where: { email },
			// relations:["order"]
		});
	}

	async currentUser(userId: string) {
		return await userRepository.findOne({
			where: { id: userId },
			// relations:["order"]
		});
	}
}
