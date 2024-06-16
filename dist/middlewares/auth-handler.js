"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = exports.authentication = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const error_handler_1 = require("./error-handler");
const user_service_1 = __importDefault(require("../services/user.service"));
const authentication = (req, res, next) => {
    const cookies = req.cookies;
    console.log({ cookies });
    const header = req.headers.authorization;
    if (!header)
        throw (0, error_handler_1.unauthorizedException)("Invalid headers param");
    let token = header.split(" ")[1];
    if (!token)
        throw (0, error_handler_1.unauthorizedException)("Auth token not found");
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode)
            throw (0, error_handler_1.unauthorizedException)("Invalid Auth token");
        req["currentUser"] = decode;
        next();
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError)
            throw (0, error_handler_1.unauthorizedException)("Invalid Auth token");
        throw error;
    }
};
exports.authentication = authentication;
const authorization = (roles) => {
    return async (req, res, next) => {
        const currentUser = req["currentUser"];
        const userService = new user_service_1.default();
        const user = await userService.currentUser(currentUser.id);
        console.log({ user });
        if (!user)
            throw (0, error_handler_1.unauthorizedException)("User not found");
        req.user = user;
        if (!roles.includes(user.role))
            throw (0, error_handler_1.forbiddenException)("Forbidden Resource");
        next();
    };
};
exports.authorization = authorization;
//# sourceMappingURL=auth-handler.js.map