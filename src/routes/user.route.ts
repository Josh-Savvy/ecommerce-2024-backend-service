import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { authentication, authorization } from "../middlewares/auth-handler";
import type { RequestWithUser } from "../middlewares/auth-handler";
import { UserRole } from "../database/entities/user.entity";
import AuthService from "../services/auth.service";
import JwtUser from "../interfaces/JwtUser";

const usersRoute = Router();

usersRoute.get(
	"/me",
	authentication,
	authorization([UserRole.User, UserRole.Admin, UserRole.SuperAdmin]),
	expressAsyncHandler(async (req: any, res) => {
		const user = req.user as JwtUser;
		const { refreshToken } = AuthService.generateAuthTokens(user.id, { withRefresh: true });
		res.status(200).json({ user, refreshToken });
	}),
);

// Todo: update profile...

export default usersRoute;
