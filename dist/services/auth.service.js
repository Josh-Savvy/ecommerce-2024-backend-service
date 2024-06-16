"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const error_handler_1 = require("../middlewares/error-handler");
const email_service_1 = __importDefault(require("./email.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cache_manager_1 = __importDefault(require("../lib/cache-manager"));
const typeorm_1 = require("typeorm");
const otp_service_1 = require("./otp.service");
class AuthService {
    constructor() {
        this.userService = new user_service_1.default();
        this.emailService = new email_service_1.default();
        this.otpService = new otp_service_1.OtpService();
    }
    static generateAuthTokens(userId, args) {
        const accessToken = jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
        cache_manager_1.default.set("accessToken", { id: userId }, 86400); //24h
        if (args === null || args === void 0 ? void 0 : args.withRefresh) {
            const refreshToken = jsonwebtoken_1.default.sign({ sub: userId }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "7d",
            });
            return { accessToken, refreshToken };
        }
        return { accessToken };
    }
    async register(input) {
        const EX = 86400;
        const errorCacheKey = `register-${input.email}`;
        const cachedErr = cache_manager_1.default.get(errorCacheKey);
        if (cachedErr)
            throw (0, error_handler_1.badRequestException)(cachedErr);
        try {
            const user = await this.userService.create(input);
            const otp = await this.otpService.generateOtpForUser(user.email);
            await this.emailService.sendRegistrationEmail({ email: user.email, data: { otp } }); // Todo: use bg event to send registration email
            const { accessToken } = AuthService.generateAuthTokens(user.id);
            return { user, accessToken };
        }
        catch (error) {
            console.error({ error });
            if (error instanceof typeorm_1.QueryFailedError)
                if (parseInt(error.driverError.code) === 23505) {
                    cache_manager_1.default.set(errorCacheKey, "Your request cannot be processed at the moment.", EX);
                    throw (0, error_handler_1.badRequestException)("Your request cannot be processed at the moment.");
                }
            throw error;
        }
    }
    async verifyRegistration(email, otp) {
        const isValid = await this.otpService.validateOtp(email, otp);
        if (!isValid)
            throw (0, error_handler_1.badRequestException)("Invalid or expired OTP");
        return { message: "Account verified successfully" };
    }
    async login(input) {
        const EX = 86400;
        const errorCacheKey = `login-error-${input.email}-${input.password}`;
        const cachedErr = cache_manager_1.default.get(errorCacheKey);
        if (cachedErr)
            throw (0, error_handler_1.badRequestException)(cachedErr);
        const user = await this.userService.findOneByEmail(input.email);
        if (!user) {
            cache_manager_1.default.set(errorCacheKey, "Invalid credentials", EX);
            throw (0, error_handler_1.badRequestException)("Invalid credentials");
        }
        const { accessToken, refreshToken } = AuthService.generateAuthTokens(user.id, { withRefresh: true });
        return { user, accessToken, refreshToken };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map