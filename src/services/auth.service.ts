import CreateUserInput from "../interfaces/CreateUserInput";
import UserService from "./user.service";
import { badRequestException } from "../middlewares/error-handler";
import EmailService from "./email.service";
import jwt from "jsonwebtoken";
import cacheManager from "../lib/cache-manager";

export default class AuthService {
	private userService = new UserService();
	private emailService = new EmailService();

	constructor() {}

	static generateAuthTokens(userId: string, args?: { withRefresh?: boolean }) {
		const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET! as string, { expiresIn: "1d" });
		cacheManager.set("accessToken", { id: userId }, 86400); //24h

		if (args?.withRefresh) {
			const refreshToken = jwt.sign({ sub: userId }, process.env.REFRESH_TOKEN_SECRET! as string, {
				expiresIn: "7d",
			});
			return { accessToken, refreshToken };
		}
		return { accessToken };
	}

	async register(input: CreateUserInput) {
		// Todo: use bg event to send registration email
		const user = await this.userService.create(input);
		await this.emailService.sendRegistrationEmail({ email: user.email });
		const accessToken = AuthService.generateAuthTokens(user.id);
		return { user, accessToken };
	}
}
