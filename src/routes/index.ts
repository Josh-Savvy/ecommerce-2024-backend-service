import { Router } from "express";
import authRoutes from "./auth.route";
import productsRoute from "./product.route";
import usersRoute from "./user.route";

const routes = Router();

routes.get("/", (req, res) => {
	res.json({ message: "Server is healthy", your_ip_addr: req.ip || req.ips });
});

routes.use("/auth", authRoutes);
routes.use("/users", usersRoute);
routes.use("/products", productsRoute);

export default routes;
