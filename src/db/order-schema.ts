import { Schema } from "mongoose";
import { IOrder } from "../models/order.ts";

export const orderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  discount: { type: Schema.Types.ObjectId, ref: "Discount" },
  refId: { type: String, default: "" },
  totalPrice: { type: Number, default: 0 },
  totalDiscount: { type: Number, default: 0 },
  transactionTime: { type: Date, default: Date.now },
  description: { type: String },
  orderItems: [{
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    price: { type: Number, default: 0 },
    priceAfterDiscount: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 }
  }]
});
