import AppDataSource from ".";
import { Auth } from "./entities/auth.entity";
import { Product } from "./entities/product.entity";
import { User } from "./entities/user.entity";

export const userRepository = AppDataSource.getRepository(User);
export const otpRepository = AppDataSource.getRepository(Auth);
export const productRepository = AppDataSource.getRepository(Product);
