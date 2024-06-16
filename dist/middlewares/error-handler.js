"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ErrorHandler = exports.forbiddenException = exports.unauthorizedException = exports.badRequestException = void 0;
const celebrate_1 = require("celebrate");
const badRequestException = (message) => {
    return new ErrorHandler(400, "Bad Request", message);
};
exports.badRequestException = badRequestException;
const unauthorizedException = (message) => {
    return new ErrorHandler(401, "Unauthorized", message);
};
exports.unauthorizedException = unauthorizedException;
const forbiddenException = (message) => {
    return new ErrorHandler(403, "Forbidden", message);
};
exports.forbiddenException = forbiddenException;
class ErrorHandler extends Error {
    constructor(statusCode, errorCode, message) {
        super(message);
        Object.setPrototypeOf(this, ErrorHandler.prototype);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
    }
}
exports.ErrorHandler = ErrorHandler;
const handleKnownExceptions = (error, request, response) => {
    console.error(Object.assign(Object.assign({}, error), { message: error.message }));
    const { statusCode, errorCode, message } = error;
    return response
        .status(statusCode)
        .json({ error: { message, errorCode, path: request.path } })
        .end();
};
const handleUnknownExceptions = (error, request, response) => {
    console.error(Object.assign(Object.assign({}, error), { message: error.message }));
    return response
        .status(500)
        .json({ error: { name: error.name, message: error.message } })
        .end();
};
const handleError = (error, request, response) => {
    console.log({ error });
    if ((0, celebrate_1.isCelebrateError)(error)) {
        const message = formatCelebrateErrors(error);
        return response.status(400).json({ error: message });
    }
    error instanceof ErrorHandler
        ? handleKnownExceptions(error, request, response)
        : handleUnknownExceptions(error, request, response);
};
exports.handleError = handleError;
function formatCelebrateErrors(error) {
    let message = "";
    error.details.forEach((validationError) => {
        if (message)
            message += "\n";
        message += validationError.message;
    });
    return message;
}
const errorHandler = (err, req, res, next) => {
    (0, exports.handleError)(err, req, res);
};
exports.default = errorHandler;
//# sourceMappingURL=error-handler.js.map