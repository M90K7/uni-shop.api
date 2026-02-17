import { Schema } from "mongoose";
import { IDiscount } from "../models/discount.ts";

export const discountSchema = new Schema<IDiscount>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  code: { type: String, required: true },
  percentage: { type: Number, required: true },
  maxValue: { type: Number, required: true },
  endAt: { type: String, required: true }
});