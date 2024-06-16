import { string } from "joi";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export interface ProductImage {
	id: string;
	url: string;
}

@Entity("products")
export class Product {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	title!: string;

	@Column("text", { nullable: true })
	description!: string;

	@Column("jsonb", { default: [] })
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

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
