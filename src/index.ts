import express from "express";
import type { Request, Response } from "express";
import "reflect-metadata";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import errorHandler from "./middlewares/error-handler";
import { xssFilter as xss } from "helmet";
import AppDataSource from "./database";
import http from "http";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.set("trust proxy", true);

app.use(express.json({ limit: "5mb" }))
	.use(express.urlencoded({ extended: true, limit: "5mb" }))
	.use(cors())
	.use(xss())
	// todo: rate limiter
	// todo: api documentation middleware
	.use(routes);

app.use(errorHandler);

// capture all 404 errors
app.use(function (request: Request, response: Response) {
	// Todo: logger
	response.status(404).json({ message: "Route not found", path: request.path }).end();
});

process.on("uncaughtException", (err) => {
	console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
	console.error(err);
	console.error(err.name, err.message);
	process.exit(1);
});

const server = http.createServer(app);

// Start server
AppDataSource.initialize()
	.then(() => {
		console.log("Database connected.");
		server.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((error) => console.error("Database connection error: ", error));
