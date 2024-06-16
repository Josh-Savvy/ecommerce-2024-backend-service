import CreateUserInput from "../interfaces/CreateUserInput";
import UserService from "./user.service";
import { badRequestException } from "../middlewares/error-handler";
import EmailService from "./email.service";
import jwt from "jsonwebtoken";
import cacheManager from "../lib/cache-manager";
import { QueryFailedError } from "typeorm";
import { OtpService } from "./otp.service";

export default class AuthService {
	private userService = new UserService();
	private emailService = new EmailService();
	private otpService = new OtpService();
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
		const cachedErr = cacheManager.get(errorCacheKey);
		if (cachedErr) throw badRequestException(cachedErr);

		try {
			const user = await this.userService.create(input);
			const otp = await this.otpService.generateOtpForUser(user.email);
			await this.emailService.sendRegistrationEmail({ email: user.email, data: { otp } }); // Todo: use bg event to send registration email
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

	async verifyRegistration(email: string, otp: string) {
		const isValid = await this.otpService.validateOtp(email, otp);
		if (!isValid) throw badRequestException("Invalid or expired OTP");
		return { message: "Account verified successfully" };
	}

	async login(input: CreateUserInput) {
		const EX = 86400;
		const errorCacheKey = `login-error-${input.email}-${input.password}`;
		const cachedErr = cacheManager.get(errorCacheKey);
		if (cachedErr) throw badRequestException(cachedErr);
		const user = await this.userService.findOneByEmail(input.email);
		if (!user) {
			cacheManager.set(errorCacheKey, "Invalid credentials", EX);
			throw badRequestException("Invalid credentials");
		}
		const { accessToken, refreshToken } = AuthService.generateAuthTokens(user.id, { withRefresh: true });
		return { user, accessToken, refreshToken };
	}

	// todo: forgot password
	// todo: reset password
}
