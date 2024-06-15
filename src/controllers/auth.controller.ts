import CreateUserInput from "../interfaces/CreateUserInput";
import AuthService from "../services/auth.service";
import { badRequestException } from "../middlewares/error-handler";

export default class AuthController {
	private authService = new AuthService();

	async register(input: CreateUserInput) {
		// validate input
		console.log({ input });
		try {
			return await this.authService.register(input);
		} catch (error) {
			console.log({ error });
			throw error;
		}
	}
}
