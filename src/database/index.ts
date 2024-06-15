import { DataSource } from "typeorm";
import type { DataSourceOptions } from "typeorm";

const dbConfig: DataSourceOptions = {
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "5432", 10),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	logging: true,
	entities: ["src/entities/**/*.ts"],
	migrations: ["src/migration/**/*.ts"],
	subscribers: ["src/subscriber/**/*.ts"],
	// Todo: add cache option
};

const AppDataSource = new DataSource({ ...dbConfig });
export default AppDataSource;
