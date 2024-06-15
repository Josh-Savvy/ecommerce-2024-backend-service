import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	BeforeUpdate,
} from "typeorm";
import { Length, IsEmail } from "class-validator";
import * as bcrypt from "bcrypt";

enum UserRole {
	User,
	Admin,
	SuperAdmin,
}
@Entity("users")
export class User {
	@PrimaryGeneratedColumn("identity")
	id!: string;

	@Column({ unique: true })
	@Length(4, 20)
	username!: string;

	@Column({ unique: true })
	@IsEmail({}, { message: "Please enter a valid email" })
	email!: string;

	@Column()
	@Length(8, 100, { message: "Password must be between 8-100 digits" })
	password!: string;

	@Column({ type: "enum", enum: UserRole, default: UserRole.User })
	role!: string;

	@Column({ default: true })
	isActive!: boolean;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		if (this.password) this.password = await bcrypt.hash(this.password, 10);
	}
	async validatePassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.password);
	}
}
