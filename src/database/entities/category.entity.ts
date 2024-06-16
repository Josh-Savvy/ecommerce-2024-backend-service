import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import Product from "./product.entity";

@Entity("categories")
export default class Category {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ unique: true, length: 100 })
	title!: string;

	@Column()
	imageUrl!: string;

	@Column({ nullable: true, length: 255 })
	description?: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(() => Product, (product) => product.category, { cascade: true })
	products!: Product[];
}
