import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("identity")
	id!: any;

	@Column()
	username!: string;

	@Column()
	email!: string;

	@Column()
	password!: string;

	@CreateDateColumn()
	createdAt!: string;

	@UpdateDateColumn()
	updatedAt!: string;
}
