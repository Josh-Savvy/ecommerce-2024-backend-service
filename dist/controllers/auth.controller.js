"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        // todo: forgot password
        // todo: reset password
    }
    async register(input) {
        try {
            return await this.authService.register(input);
        }
        catch (error) {
            console.log({ error: error.message });
            throw error;
        }
    }
    async login(input) {
        try {
            return await this.authService.login(input);
        }
        catch (error) {
            console.log({ error: error.message });
            throw error;
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map