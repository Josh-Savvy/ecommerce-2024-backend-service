import AppDataSource from ".";
import Auth from "./entities/auth.entity";
import Category from "./entities/category.entity";
import Order from "./entities/order.entity";
import Product from "./entities/product.entity";
import User from "./entities/user.entity";

export const userRepository = AppDataSource.getRepository(User);
export const otpRepository = AppDataSource.getRepository(Auth);
export const productRepository = AppDataSource.getRepository(Product);
export const categoryRepository = AppDataSource.getRepository(Category);
export const orderRepository = AppDataSource.getRepository(Order);
