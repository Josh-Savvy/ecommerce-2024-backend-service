"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleProductSchema = exports.LimitAndSkipQuerySchema = exports.loginSchema = exports.createUserSchema = exports.passwordValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const passwordValidationSchema = (requiredLength = 6) => {
    const uppercaseRegex = /^(?=.*[A-Z])/;
    // const lowercaseRegex = /^(?=.*[a-z])/;
    const digitRegex = /^(?=.*\d)/;
    const specialCharRegex = /^(?=.*[@$!%*?&])/;
    return joi_1.default.string()
        .trim()
        .custom((value, helpers) => {
        value = value.trim();
        if (value.length < requiredLength)
            return helpers.error("string.min", { limit: requiredLength });
        else if (!uppercaseRegex.test(value))
            return helpers.error("password.invalidUppercase");
        else if (!specialCharRegex.test(value))
            return helpers.error("password.invalidSpecialChar");
        else if (!digitRegex.test(value))
            return helpers.error("password.invalidDigit");
        return value;
    }, "Password validation")
        .required()
        .messages({
        "any.required": `password must be at least ${requiredLength}-digits`,
        "string.min": `password must be at least ${requiredLength}-digits`,
        "password.invalidUppercase": "password must include a capital letter",
        "password.invalidSpecialChar": "password must include a special character",
        "password.invalidDigit": "password must include a number",
    });
};
exports.passwordValidationSchema = passwordValidationSchema;
exports.createUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "any.required": "email is required",
        "string.base": "email is required",
        "string.required": "email is required",
        "string.email": "invalid email",
        "string.empty": "email cannot be empty",
    }),
    password: (0, exports.passwordValidationSchema)(),
});
exports.loginSchema = exports.createUserSchema;
exports.LimitAndSkipQuerySchema = joi_1.default.object({
    limit: joi_1.default.number().positive().min(1).optional().messages({
        "number.min": "limit cannot be less than one",
        "any.positive": "limit must be a positive integer",
    }),
    skip: joi_1.default.number().positive().min(0).optional().messages({
        "number.min": "skip must be a positive integer",
        "any.positive": "skip must be a positive integer",
    }),
});
exports.getSingleProductSchema = joi_1.default.object({
    productId: joi_1.default.string().uuid().required().messages({
        "string.trim": "productId is required",
        "string.empty": "productId is required",
        "string.required": "productId is required",
        "any.required": "productId is required",
        "any.base": "productId is required",
        "string.guid": "invalid productId",
    }),
});
//# sourceMappingURL=validation-schema.js.map