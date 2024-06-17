import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	BeforeUpdate,
	OneToMany,
	ManyToMany,
} from "typeorm";
import * as bcrypt from "bcrypt";
import Order from "./order.entity";

export enum UserRole {
	User = "User",
	Seller = "Seller",
	Admin = "Admin",
	SuperAdmin = "SuperAdmin",
}
@Entity("users")
export default class User {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ unique: true })
	username!: string;

	@Column()
	avatar!: string;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Column({ type: "enum", enum: UserRole, default: UserRole.User })
	role!: UserRole;

	@Column({ default: false })
	isActive!: boolean;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(() => Order, (order) => order.user, { onDelete: "SET NULL", nullable: true })
	orders!: Order[];

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		if (this.password) this.password = await bcrypt.hash(this.password, 10);
	}
	async validatePassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.password);
	}
}
