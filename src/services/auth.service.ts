import CreateUserInput from "../interfaces/CreateUserInput";
import UserService from "./user.service";
import { badRequestException } from "../middlewares/error-handler";
import EmailService from "./email.service";
import jwt from "jsonwebtoken";
import cacheManager from "../lib/cache-manager";
import { QueryFailedError } from "typeorm";

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
		const EX = 86400;
		const errorCacheKey = `register-${input.email}`;
		if (cacheManager.has(errorCacheKey)) {
			const cachedErr = cacheManager.get(errorCacheKey);
			console.log({ cachedErr });
			throw badRequestException(cachedErr);
		}
		try {
			const user = await this.userService.create(input);
			await this.emailService.sendRegistrationEmail({ email: user.email }); // Todo: use bg event to send registration email
			const { accessToken } = AuthService.generateAuthTokens(user.id);
			return { user, accessToken };
		} catch (error: any) {
			console.error({ error });
			if (error instanceof QueryFailedError)
				if (parseInt(error.driverError.code) === 23505) {
					cacheManager.set(errorCacheKey, "Your request cannot be processed at the moment.", EX);
					throw badRequestException("Your request cannot be processed at the moment.");
				}
			throw error;
		}
	}

	async login(input: CreateUserInput) {
		const EX = 86400;
		const errorCacheKey = `login-error-${input.email}-${input.password}`;
		if (cacheManager.has(errorCacheKey)) {
			const cachedErr = cacheManager.get(errorCacheKey);
			console.log({ cachedErr });
			throw badRequestException(cachedErr);
		}
		const user = await this.userService.findOneByEmail(input.email);
		if (!user) {
			cacheManager.set(errorCacheKey, "Invalid credentials", EX);
			throw badRequestException("Invalid credentials");
		}
	}

	// todo: forgot password
	// todo: reset password
}
