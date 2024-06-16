"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const auth_entity_1 = __importDefault(require("../database/entities/auth.entity"));
const repository_1 = require("../database/repository");
class OtpService {
    async generateOtpForUser(identifier) {
        const auth = new auth_entity_1.default();
        auth.identifier = identifier;
        return await repository_1.otpRepository.save(auth);
    }
    async validateOtp(identifier, otp) {
        const auth = await repository_1.otpRepository.findOne({
            where: { identifier, otp },
            order: { createdAt: "DESC" },
        });
        return auth ? auth.isValid() : false;
    }
}
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map