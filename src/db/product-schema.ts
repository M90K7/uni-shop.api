import { Schema } from "mongoose";
import { IProduct } from "../models/index.ts";

export const productSchema = new Schema<IProduct>({
  persianTitle: { type: String, required: true },
  englishTitle: { type: String, required: false },
  url: { type: String, required: true },
  price: { type: Number, required: true },
  priceAfterDiscount: { type: Number, required: false },
  discountAmount: { type: Number, required: false },
  score: { type: Number, required: false },
  scoreCount: { type: Number, required: false },
  imagePath: { type: String, required: false },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  isAvailable: { type: Boolean, required: true },
  attributes: {
    type: Map,
    of: String
  },
  keywords: [String],
  avgUserScores: {
    contentScore: { type: Number, required: true },
    priceScore: { type: Number, required: true },
    supportScore: { type: Number, required: true },
    productScore: { type: Number, required: true }
  },
  userScores: {
    type: Map,
    of: {
      contentScore: { type: Number, required: true },
      priceScore: { type: Number, required: true },
      supportScore: { type: Number, required: true },
      productScore: { type: Number, required: true }
    },
    select: false
  }
});

