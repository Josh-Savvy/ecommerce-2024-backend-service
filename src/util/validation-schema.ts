import Joi from "joi";

export const passwordValidationSchema = (requiredLength = 6) => {
	const uppercaseRegex = /^(?=.*[A-Z])/;
	// const lowercaseRegex = /^(?=.*[a-z])/;
	const digitRegex = /^(?=.*\d)/;
	const specialCharRegex = /^(?=.*[@$!%*?&])/;

	return Joi.string()
		.trim()
		.custom((value: string, helpers) => {
			value = value.trim();
			if (value.length < requiredLength) return helpers.error("string.min", { limit: requiredLength });
			else if (!uppercaseRegex.test(value)) return helpers.error("password.invalidUppercase");
			else if (!specialCharRegex.test(value)) return helpers.error("password.invalidSpecialChar");
			else if (!digitRegex.test(value)) return helpers.error("password.invalidDigit");
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

export const createUserSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"any.required": "email is required",
		"string.base": "email is required",
		"string.required": "email is required",
		"string.email": "invalid email",
		"string.empty": "email cannot be empty",
	}),
	password: passwordValidationSchema(),
});

export const loginSchema = createUserSchema;

export const LimitAndSkipQuerySchema = Joi.object({
	limit: Joi.number().positive().min(1).optional().messages({
		"number.min": "limit cannot be less than one",
		"any.positive": "limit must be a positive integer",
	}),
	skip: Joi.number().positive().min(0).optional().messages({
		"number.min": "skip must be a positive integer",
		"any.positive": "skip must be a positive integer",
	}),
});

export const resourceIdSchema = (name: string) =>
	Joi.string()
		.uuid()
		.required()
		.messages({
			"string.trim": `${name} is required`,
			"string.empty": `${name} is required`,
			"string.required": `${name} is required`,
			"any.required": `${name} is required`,
			"any.base": `${name} is required`,
			"string.guid": `invalid ${name}`,
		});
