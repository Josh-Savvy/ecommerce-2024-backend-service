import { CelebrateError, isCelebrateError } from "celebrate";
import { Request, Response, NextFunction } from "express";

export const badRequestException = (message: any) => {
	return new ErrorHandler(400, "Bad Request", message);
};

export const unauthorizedException = (message: string) => {
	return new ErrorHandler(401, "Unauthorized", message);
};

export const forbiddenException = (message: string) => {
	return new ErrorHandler(403, "Forbidden", message);
};

export class ErrorHandler extends Error {
	statusCode: number;
	errorCode: string;
	message: any;

	constructor(statusCode: number, errorCode: string, message: any) {
		super(message);
		Object.setPrototypeOf(this, ErrorHandler.prototype);
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.message = message;
	}
}

const handleKnownExceptions = (error: ErrorHandler, request: Request, response: Response) => {
	console.error({ ...error, message: error.message });
	const { statusCode, errorCode, message } = error;
	return response
		.status(statusCode)
		.json({ error: { message, errorCode, path: request.path, statusCode } })
		.end();
};

const handleUnknownExceptions = (error: Error, request: Request, response: Response) => {
	console.error({ ...error, message: error.message });
	return response
		.status(500)
		.json({ error: { name: error.name, message: error.message } })
		.end();
};

export const handleError = (error: ErrorHandler | Error | CelebrateError, request: Request, response: Response) => {
	console.log({ error });

	if (isCelebrateError(error)) {
		const message = formatCelebrateErrors(error);
		return response.status(400).json({ error: message });
	}

	error instanceof ErrorHandler
		? handleKnownExceptions(error, request, response)
		: handleUnknownExceptions(error, request, response);
};

function formatCelebrateErrors(error: CelebrateError) {
	let message = "";

	error.details.forEach((validationError) => {
		if (message) message += "\n";
		message += validationError.message;
	});
	return message;
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	handleError(err, req, res);
};

export default errorHandler;
