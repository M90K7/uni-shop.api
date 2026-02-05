import mongoose from "mongoose";
import { ICategory, ICategoryDocument } from "../models/category.ts";
import { IProduct, IProductDocument, IUser, IUserDocument } from "../models/index.ts";
import { categorySchema } from "./category-schema.ts";
import { productSchema } from "./product-schema.ts";
import { userSchema } from "./user.schema.ts";

const Product: mongoose.Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

const Category: mongoose.Model<ICategoryDocument> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);

const User: mongoose.Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export const context = {
  product: Product,
  category: Category,
  user: User
};

// export const Product = models.Product || model<IProduct>('Product', productSchema);

export async function syncAllIndexes() {
  await context.category.syncIndexes();
  await context.product.syncIndexes();
  await context.user.syncIndexes();
}