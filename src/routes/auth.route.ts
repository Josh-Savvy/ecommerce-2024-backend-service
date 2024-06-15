import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import expressAsyncHandler from "express-async-handler";
import { celebrate } from "celebrate";
import { createUserSchema } from "../util/validation-schema";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(
	"/sign-up",
	celebrate({ body: createUserSchema }),
	expressAsyncHandler(async (req, res) => {
		const data = await authController.register(req.body);
		res.status(201).json({ message: "User created successfully", ...data });
	}),
);

export default authRoutes;
