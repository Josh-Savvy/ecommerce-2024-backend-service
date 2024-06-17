"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = __importDefault(require("./product.entity"));
const string_helper_1 = __importDefault(require("../../helpers/string.helper"));
const user_entity_1 = __importDefault(require("./user.entity"));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["IN_PROGRESS"] = "IN_PROGRESS";
    OrderStatus["DISPATCHED"] = "DISPATCHED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
let Order = class Order {
    // Constructor to initialize products array
    constructor(notes) {
        this.orderNumber = string_helper_1.default.generateUniqueOrderId();
        this.notes = notes || "";
        this.totalAmount = 0;
    }
    updateTotalAmount() {
        this.totalAmount = this.products.reduce((total, product) => total + product.price, 0);
    }
    addProduct(product) {
        this.products.push(product);
        product.order = this;
        this.updateTotalAmount();
    }
    removeProduct(product) {
        const index = this.products.indexOf(product);
        if (index !== -1) {
            product.order = null;
            this.products.splice(index, 1);
            this.updateTotalAmount();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, default: string_helper_1.default.generateUniqueOrderId() }),
    __metadata("design:type", String)
], Order.prototype, "orderNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: OrderStatus, default: OrderStatus.IN_PROGRESS }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.default, (product) => product.order, { cascade: true, onDelete: "NO ACTION" }),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default, (user) => user.orders, { onDelete: "NO ACTION" }),
    __metadata("design:type", user_entity_1.default)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "deliveryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "deliveredOn", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)("orders"),
    __metadata("design:paramtypes", [String])
], Order);
exports.default = Order;
//# sourceMappingURL=order.entity.js.map