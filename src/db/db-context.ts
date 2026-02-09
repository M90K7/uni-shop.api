import {
  ICategory, ICategoryDocument,
  IComment,
  ICommentDocument,
  IFavorite, IFavoriteDocument,
  IProduct, IProductDocument,
  ISession, ISessionDocument,
  IUser, IUserDocument
} from "@app/models";
import mongoose from "mongoose";
import { categorySchema } from "./category-schema.ts";
import { favoriteSchema } from "./favorite.schema.ts";
import { productSchema } from "./product-schema.ts";
import { sessionSchema } from "./session-schema.ts";
import { userSchema } from "./user.schema.ts";
import { commentSchema } from "./commnet-schema.ts";

const Product: mongoose.Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

const Category: mongoose.Model<ICategoryDocument> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);

const User: mongoose.Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

const Favorite: mongoose.Model<IFavoriteDocument> =
  mongoose.models.Favorite || mongoose.model<IFavorite>('Favorite', favoriteSchema);

const Session: mongoose.Model<ISessionDocument> =
  mongoose.models.Session || mongoose.model<ISession>('Session', sessionSchema);

const Comment: mongoose.Model<ICommentDocument> =
  mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema);

export const context = {
  product: Product,
  category: Category,
  user: User,
  favorite: Favorite,
  session: Session,
  comment: Comment
};

// export const Product = models.Product || model<IProduct>('Product', productSchema);

export async function syncAllIndexes() {
  await context.category.syncIndexes();
  await context.product.syncIndexes();
  await context.user.syncIndexes();
  await context.favorite.syncIndexes();
  await context.session.syncIndexes();
  await context.comment.syncIndexes();
}