import { context } from "@app/db";
import { IFavoriteDocument } from "../../models/favorites.ts";

export function isProductInFavorites(userId: string, productId: string) {
  return context.favorite.findOne({ user: userId, product: productId }).exec().then(t => t ? true : false);
}

export function addProductInFavorites(userId: string, productId: string) {
  const favorite = new context.favorite({ user: userId, product: productId });
  return favorite.save();
}

export function removeProductInFavorites(userId: string, productId: string) {
  return context.favorite.deleteOne({ user: userId, product: productId }).then(res => res.deletedCount === 1 ? true : false);
}

export function getProductsInFavorites(userId: string) {
  return context.favorite.find({ user: userId }).populate("product").exec();
}

export function getAllSumProductFavorites() {
  // return product model with populated product data
  return context.favorite.aggregate([
    { $match: {} },
    { $group: { _id: "$product", count: { $sum: 1 } } },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" }
  ]).sort({ count: -1 }).exec();
}