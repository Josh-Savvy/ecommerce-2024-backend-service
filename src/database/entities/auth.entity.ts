import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	PrimaryColumn,
} from "typeorm";

@Entity("auth-otps")
export class Auth {
	@PrimaryColumn()
	/**
	 * email or phone number
	 */
	identifier!: string;

	@Column({ default: "email" })
	type!: "email" | "sms";

	@Column({ length: 6 })
	otp!: string;

	@Column()
	expiresAt!: Date;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@BeforeInsert()
	generateOtp(expiry?: Date) {
		this.otp = Math.floor(100000 + Math.random() * 900000).toString();
		this.expiresAt = expiry || new Date(Date.now() + 10 * 60 * 1000); // expiry or 10mins after creating
	}

	isValid() {
		return new Date() < this.expiresAt;
	}
}
