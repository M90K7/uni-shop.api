import { Document, Types } from "mongoose";
import { IDiscount } from "./discount.ts";
import { IProduct } from "./product.ts";
import { IUser } from "./user.ts";


export interface OrderItem {
  product: IProduct | Types.ObjectId;
  price: number;
  priceAfterDiscount: number;
  discountAmount: number;
}

export interface IOrder {
  _id: Types.ObjectId;
  user: IUser | Types.ObjectId;
  orderItems: OrderItem[];
  discount: IDiscount | Types.ObjectId;
  totalPrice: number | null;
  totalDiscount: number | null;
  discountCode: string;
  refId: string;
  transactionTime: Date;
  description?: string;
}

export interface IOrderDocument extends IOrder, Document { }