import { IProduct } from "@app/models";
import { context } from "../db/db-context.ts";

export function addCart(userId: string, product: IProduct) {
  context.user.findByIdAndUpdate(userId, {
    $addToSet: { carts: product._id }
  }).exec();
}

export async function getCarts(userId: string) {
  const user = await context.user.findById(userId).exec();
  if (user && user.carts.length > 0) {
    const products = await context.product.find({
      _id: { $in: user.carts }
    }).exec();
    return products;
  }
  return [];
}

// remove cart
export function removeCart(userId: string, productId: string) {
  return context.user.findByIdAndUpdate(userId, {
    $pull: { carts: productId }
  }).exec();
}