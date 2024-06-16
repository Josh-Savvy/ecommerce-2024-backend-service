import CreateUserInput from "../interfaces/CreateUserInput";
import AuthService from "../services/auth.service";
import { badRequestException } from "../middlewares/error-handler";

export default class AuthController {
	private authService = new AuthService();

	async register(input: CreateUserInput) {
		try {
			return await this.authService.register(input);
		} catch (error: any) {
			console.log({ error: error.message });
			throw error;
		}
	}

	async login(input: CreateUserInput) {
		try {
			return await this.authService.login(input);
		} catch (error: any) {
			console.log({ error: error.message });
			throw error;
		}
	}
	// todo: forgot password
	// todo: reset password
}
