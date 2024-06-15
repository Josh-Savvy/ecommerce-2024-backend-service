import { Router } from "express";
import authRoutes from "./auth.route";

const routes = Router();

routes.get("/", (req, res) => {
	res.json({ message: "Server is healthy", ip: req.ip || req.ips });
});

routes.use("/auth", authRoutes);

export default routes;
