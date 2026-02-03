import mongoose from "mongoose";
import { IProduct, IProductDocument } from "../models/index.ts";
import { productSchema } from "./product-schema.ts";

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export const context = {
  product: Product
};

// export const Product = models.Product || model<IProduct>('Product', productSchema);

export async function syncAllIndexes() {
  await context.product.syncIndexes();
}