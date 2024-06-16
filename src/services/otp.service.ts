import Auth from "../database/entities/auth.entity";
import { otpRepository } from "../database/repository";

export class OtpService {
	async generateOtpForUser(identifier: string): Promise<Auth> {
		const auth = new Auth();
		auth.identifier = identifier;
		return await otpRepository.save(auth);
	}

	async validateOtp(identifier: string, otp: string): Promise<boolean> {
		const auth = await otpRepository.findOne({
			where: { identifier, otp },
			order: { createdAt: "DESC" },
		});
		return auth ? auth.isValid() : false;
	}
}
