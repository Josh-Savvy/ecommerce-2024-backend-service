"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_handler_1 = require("../middlewares/auth-handler");
const user_entity_1 = require("../database/entities/user.entity");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const usersRoute = (0, express_1.Router)();
usersRoute.get("/me", auth_handler_1.authentication, (0, auth_handler_1.authorization)([user_entity_1.UserRole.User, user_entity_1.UserRole.Admin, user_entity_1.UserRole.SuperAdmin]), (0, express_async_handler_1.default)(async (req, res) => {
    const user = req.user;
    const { refreshToken } = auth_service_1.default.generateAuthTokens(user.id, { withRefresh: true });
    res.status(200).json({ user, refreshToken });
}));
// Todo: update profile...
exports.default = usersRoute;
//# sourceMappingURL=user.route.js.map