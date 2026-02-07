import { context } from "@app/db";
import { IFavoriteDocument } from "../../models/favorites.ts";

export function isProductInFavorites(userId: string, productId: string) {
  return context.favorite.findOne({ userId, productId }).exec().then(t => t ? true : false);
}

export function addProductInFavorites(userId: string, productId: string) {
  const favorite = new context.favorite({ userId, productId });
  return favorite.save();
}

export function removeProductInFavorites(userId: string, productId: string) {
  return context.favorite.deleteOne({ userId, productId }).then(res => res.deletedCount === 1 ? true : false);
}