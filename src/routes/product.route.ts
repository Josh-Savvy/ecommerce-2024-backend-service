import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { ProductController } from "../controllers/product.controller";

const productsRoute = Router();

const productsController = new ProductController();

productsRoute.post(
	"/",
	// todo: validation
	expressAsyncHandler(async (req, res) => {
		const data = await productsController.createProduct(req.body);
		res.status(201).json({ messsage: "Product created successfully", data });
	}),
);

productsRoute.get(
	"/:id",
	// todo: validation
	expressAsyncHandler(async (req, res) => {
		const data = await productsController.getProductById(req.params.id);
		res.status(200).json({ ...data });
	}),
);

productsRoute.put(
	"/:id",
	// Todo: iput validation
	expressAsyncHandler(async (req, res) => {
		const data = await productsController.updateProduct(req.params.id, req.body);
		res.status(200).json({ ...data });
	}),
);

productsRoute.delete(
	"/:id",
	expressAsyncHandler(async (req, res) => {
		await productsController.deleteProduct(req.params.id);
		res.status(200).json({ message: "Product deleted successfully" });
	}),
);

productsRoute.get(
	"/",
	// Todo: query validatiot
	expressAsyncHandler(async (req, res) => {
		let params = req.params as any;
		const data = await productsController.getAllProducts(params.limit, params.skip);
		res.status(200).json(data);
	}),
);

export default productsRoute;
