import type { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { forbiddenException, unauthorizedException } from "./error-handler";
import type JwtUser from "../interfaces/JwtUser";
import { userRepository } from "../database/repository";
import { User } from "../database/entities/user.entity";

export const authentication = (req: Request, res: Response, next: NextFunction) => {
	const header = req.headers.authorization;
	if (!header) throw unauthorizedException("Invalid headers param");
	const token = header.split(" ")[1];
	if (!token) throw unauthorizedException("Auth token not found");
	const decode = jwt.verify(token, process.env.JWT_SECRET!);
	if (!decode) throw unauthorizedException("Invalid Auth token");
	(req as any)["currentUser"] = decode as JwtUser;
	next();
};

export const authorization = (roles: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const currentUser = (req as any)["currentUser"] as JwtUser;
		const user = await userRepository.findOne({ where: { id: currentUser.id } });
		if (!user) throw unauthorizedException("User not found");
		console.log({ user });
		if (!roles.includes(user.role)) throw forbiddenException("Forbidden Resource");
		next();
	};
};
