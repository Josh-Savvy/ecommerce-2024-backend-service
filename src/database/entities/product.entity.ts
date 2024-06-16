import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import Category from "./category.entity";
import Order from "./order.entity";

export interface ProductImage {
	id: string;
	url: string;
}

export interface Rating {
	id: string;
	value: number;
	ratedBy: string; //userId
}

@Entity("products")
export default class Product {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ length: 100 })
	title!: string;

	@Column("text", { nullable: true })
	description!: string;

	@Column("jsonb", { default: [], nullable: true })
	images!: ProductImage[];

	@Column("decimal", { precision: 10, scale: 2 })
	price!: number;

	@Column("int")
	quantity!: number;

	@Column("bigint", { default: 0 })
	views!: number;

	@Column("int", { nullable: true })
	percentageOff?: number;

	@Column("decimal", { precision: 10, scale: 2, nullable: true })
	discoutedPrice!: number;

	@Column("jsonb", { default: [], nullable: true })
	rating!: Rating[];

	// Todo: created by

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@ManyToOne(() => Category, (category) => category.products, { onDelete: "CASCADE" })
	category!: Category;

	@ManyToOne(() => Order, (order) => order.products, { nullable: true, onDelete: "SET NULL" })
	order!: Order | null;
}
