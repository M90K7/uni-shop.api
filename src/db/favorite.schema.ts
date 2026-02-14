import { Schema } from "mongoose";
import { IFavorite } from "../models/favorites.ts";

export const favoriteSchema = new Schema<IFavorite>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  createdAt: { type: Number, default: Date.now }
});
