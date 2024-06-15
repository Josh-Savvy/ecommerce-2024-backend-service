import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
	res.json({ message: "Server is healthy" });
});

export default routes;
