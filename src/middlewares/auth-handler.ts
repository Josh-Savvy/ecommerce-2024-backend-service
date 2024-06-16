import type { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { forbiddenException, unauthorizedException } from "./error-handler";
import type JwtUser from "../interfaces/JwtUser";
import User, { UserRole } from "../database/entities/user.entity";
import UserService from "../services/user.service";

export const authentication = (req: Request, res: Response, next: NextFunction) => {
	const cookies = req.cookies;
	console.log({ cookies });
	const header = req.headers.authorization;
	if (!header) throw unauthorizedException("Invalid headers param");
	let token = header.split(" ")[1];
	if (!token) throw unauthorizedException("Auth token not found");
	try {
		const decode = jwt.verify(token, process.env.JWT_SECRET!);
		if (!decode) throw unauthorizedException("Invalid Auth token");
		(req as any)["currentUser"] = decode as JwtUser;
		next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) throw unauthorizedException("Invalid Auth token");
		throw error;
	}
};

export type RequestWithUser = Request & { user: User };

export const authorization = (roles: UserRole[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const currentUser = (req as any)["currentUser"] as JwtUser;
		const userService = new UserService();
		const user = await userService.currentUser(currentUser.id);
		console.log({ user });
		if (!user) throw unauthorizedException("User not found");
		(req as RequestWithUser).user = user;
		if (!roles.includes(user.role)) throw forbiddenException("Forbidden Resource");
		next();
	};
};
