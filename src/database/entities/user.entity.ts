import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	BeforeUpdate,
} from "typeorm";
import * as bcrypt from "bcrypt";

enum UserRole {
	User = "User",
	Admin = "Admin",
	SuperAdmin = "SuperAdmin",
}
@Entity("users")
export class User {
	@PrimaryGeneratedColumn("identity")
	id!: string;

	@Column({ unique: true })
	username!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Column({ type: "enum", enum: UserRole, default: UserRole.User })
	role!: string;

	@Column({ default: false })
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
