import CreateUserInput from "../interfaces/CreateUserInput";
import { badRequestException } from "../middlewares/error-handler";
import { userRepository } from "../database/repository";
import { User } from "../database/entities/user.entity";
import StringHelper from "../helpers/string.helper";

export default class UserService {
	async create(input: CreateUserInput) {
		const { email, password } = input;
		let user = new User();
		user.username = StringHelper.generateUsername();
		user.email = email;
		user.password = password;
		user = await userRepository.save(user);
		return user;
	}
	// const userRepository = getRepository(User);
}
