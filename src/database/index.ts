import { DataSource } from "typeorm";
import type { DataSourceOptions } from "typeorm";
import { config } from "dotenv";
// Entities
import User from "./entities/user.entity";
import Product from "./entities/product.entity";
import Auth from "./entities/auth.entity";
import Category from "./entities/category.entity";
import Order from "./entities/order.entity";
import Seller from "./entities/seller.entity";
config();

const dbConfig: DataSourceOptions = {
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "5432", 10),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	ssl: process.env.NODE_ENV === "production",
	extra: process.env.NODE_ENV === "production" ? { ssl: { rejectUnauthorized: false } } : {},
	logging: !true,
	synchronize: true,
	entities: [User, Seller, Product, Auth, Category, Order],
	// Todo: add cache option
};

const AppDataSource = new DataSource({ ...dbConfig });
export default AppDataSource;
