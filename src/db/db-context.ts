import mongoose from "mongoose";
import { ICategory, ICategoryDocument } from "../models/category.ts";
import { IFavorite, IFavoriteDocument } from "../models/favorites.ts";
import { IProduct, IProductDocument, IUser, IUserDocument } from "../models/index.ts";
import { categorySchema } from "./category-schema.ts";
import { favoriteSchema } from "./favorite.schema.ts";
import { productSchema } from "./product-schema.ts";
import { userSchema } from "./user.schema.ts";

const Product: mongoose.Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

const Category: mongoose.Model<ICategoryDocument> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);

const User: mongoose.Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

const Favorite: mongoose.Model<IFavoriteDocument> =
  mongoose.models.Favorite || mongoose.model<IFavorite>('Favorite', favoriteSchema);

export const context = {
  product: Product,
  category: Category,
  user: User,
  favorite: Favorite
};

// export const Product = models.Product || model<IProduct>('Product', productSchema);

export async function syncAllIndexes() {
  await context.category.syncIndexes();
  await context.product.syncIndexes();
  await context.user.syncIndexes();
  await context.favorite.syncIndexes();
}