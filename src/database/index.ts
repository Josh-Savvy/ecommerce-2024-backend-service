import { DataSource } from "typeorm";
import type { DataSourceOptions } from "typeorm";
import { User } from "./entities/user.entity";
import { config } from "dotenv";
config();

const dbConfig: DataSourceOptions = {
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "5432", 10),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	logging: !true,
	synchronize: true,
	entities: [User],
	// Todo: add cache option
};

const AppDataSource = new DataSource({ ...dbConfig });
export default AppDataSource;
