import { CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import User from "./user.entity";
import Product from "./product.entity";

@Entity("sellers")
export default class Seller {
	@OneToOne(() => User, (user) => user.sellerProfile, { onDelete: "CASCADE" })
	@JoinColumn({ name: "userId" })
	user!: User;

	@PrimaryColumn("uuid")
	userId!: string;

	@OneToMany(() => Product, (product) => product.seller, { onDelete: "SET NULL", nullable: true })
	products!: Product[];

	@CreateDateColumn({ type: "timestamp" })
	createdAt!: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updatedAt!: Date;
}
