import { Schema } from "mongoose";
import { IFavorite } from "../models/favorites.ts";

export const favoriteSchema = new Schema<IFavorite>({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  createdAt: { type: Number, default: Date.now }
});
