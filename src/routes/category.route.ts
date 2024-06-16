import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import CategoryController from "../controllers/category.controller";
import { celebrate, Joi } from "celebrate";
import { LimitAndSkipQuerySchema, resourceIdSchema } from "../util/validation-schema";

const categoryController = new CategoryController();

const categoryRoute = Router();

categoryRoute.get(
	"/",
	celebrate({ query: LimitAndSkipQuerySchema }),
	expressAsyncHandler(async (req, res) => {
		const { skip, limit } = req.query as { skip?: number; limit?: number };
		const data = await categoryController.getAllCategories(skip, limit);
		res.status(200).json(data);
	}),
);

categoryRoute.get(
	"/:categoryId",
	celebrate({ params: Joi.object({ categoryId: resourceIdSchema("categoryId") }) }),
	expressAsyncHandler(async (req, res) => {
		const categoryId = req.params.categoryId;
		const data = await categoryController.getCategoryById(categoryId);
		res.status(200).json(data);
	}),
);

export default categoryRoute;
