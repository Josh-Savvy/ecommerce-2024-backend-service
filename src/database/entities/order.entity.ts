import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from "typeorm";
import Product from "./product.entity";
import StringHelper from "../../helpers/string.helper";
import User from "./user.entity";

export enum OrderStatus {
	IN_PROGRESS = "IN_PROGRESS",
	DISPATCHED = "DISPATCHED",
	DELIVERED = "DELIVERED",
	CANCELLED = "CANCELLED",
}

@Entity("orders")
export default class Order {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ unique: true, default: StringHelper.generateUniqueOrderId() })
	orderNumber!: string;

	@Column({ type: "text", nullable: true })
	notes!: string;

	@Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
	totalAmount!: number;

	@Column({ type: "enum", enum: OrderStatus, default: OrderStatus.IN_PROGRESS })
	status!: OrderStatus;

	@OneToMany(() => Product, (product) => product.order, { cascade: true, onDelete: "NO ACTION" })
	products!: Product[];

	@ManyToOne(() => User, (user) => user.orders, { onDelete: "NO ACTION" })
	user!: User;

	@Column({ type: "timestamp", nullable: true })
	deliveryDate!: Date | null;

	@Column({ type: "timestamp", nullable: true })
	deliveredOn!: Date | null;

	@CreateDateColumn({ type: "timestamp" })
	createdAt!: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updatedAt!: Date;

	// Constructor to initialize products array
	constructor(notes?: string) {
		this.orderNumber = StringHelper.generateUniqueOrderId();
		this.notes = notes || "";
		this.totalAmount = 0;
	}

	updateTotalAmount() {
		this.totalAmount = this.products.reduce((total, product) => total + product.price, 0);
	}

	addProduct(product: Product) {
		this.products.push(product);
		product.order = this;
		this.updateTotalAmount();
	}

	removeProduct(product: Product) {
		const index = this.products.indexOf(product);
		if (index !== -1) {
			product.order = null;
			this.products.splice(index, 1);
			this.updateTotalAmount();
		}
	}
}
