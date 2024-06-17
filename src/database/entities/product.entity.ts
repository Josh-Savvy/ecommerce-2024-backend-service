import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import Category from "./category.entity";
import Order from "./order.entity";
import User from "./user.entity";

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

	@Column({ default: true })
	inStock!: boolean;

	@Column("bigint", { default: 0 })
	views!: number;

	@Column("int", { nullable: true })
	percentageOff?: number;

	@Column("decimal", { precision: 10, scale: 2, nullable: true })
	discoutedPrice!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@Column("jsonb", { default: [], nullable: true })
	rating!: Rating[];

	@ManyToOne(() => User, (user) => user.products, { onDelete: "CASCADE" })
	@JoinColumn({ name: "sellerId" })
	seller!: User;

	@Column()
	sellerId!: string;

	@ManyToOne(() => Category, (category) => category.products, { onDelete: "RESTRICT" })
	@JoinColumn({ name: "categoryId" })
	category!: Category;

	@Column()
	categoryId!: string;

	@ManyToOne(() => Order, (order) => order.products, { nullable: true, onDelete: "SET NULL" })
	@JoinColumn({ name: "orderId" })
	order!: Order | null;

	@Column({ nullable: true })
	orderId!: string;
}
