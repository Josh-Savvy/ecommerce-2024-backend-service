import AppDataSource from ".";
import { User } from "./entities/user.entity";

export const userRepository = AppDataSource.getRepository(User);
