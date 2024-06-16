import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { ProductController } from "../controllers/product.controller";
import { celebrate, Joi } from "celebrate";
import { LimitAndSkipQuerySchema, resourceIdSchema } from "../util/validation-schema";

const productsRoute = Router();

const productsController = new ProductController();

productsRoute.post(
	"/",
	// todo: input validation
	expressAsyncHandler(async (req, res) => {
		const data = await productsController.createProduct(req.body);
		res.status(201).json({ messsage: "Product created successfully", data });
	}),
);

productsRoute.get(
	"/:productId",
	celebrate({ params: Joi.object({ productId: resourceIdSchema("productId") }) }),
	expressAsyncHandler(async (req, res) => {
		const data = await productsController.getProductById(req.params.productId);
		res.status(200).json({ ...data });
	}),
);

productsRoute.put(
	"/:productId",
	celebrate({ params: Joi.object({ productId: resourceIdSchema("productId") }) }),
	expressAsyncHandler(async (req, res) => {
		const data = await productsController.updateProduct(req.params.id, req.body);
		res.status(200).json({ ...data });
	}),
);

productsRoute.delete(
	"/:productId",
	celebrate({ params: Joi.object({ productId: resourceIdSchema("productId") }) }),
	expressAsyncHandler(async (req, res) => {
		await productsController.deleteProduct(req.params.id);
		res.status(200).json({ message: "Product deleted successfully" });
	}),
);

productsRoute.get(
	"/",
	celebrate({ query: LimitAndSkipQuerySchema }),
	expressAsyncHandler(async (req, res) => {
		let params = req.query as any;
		const data = await productsController.getAllProducts(params.limit, params.skip);
		res.status(200).json(data);
	}),
);

export default productsRoute;
