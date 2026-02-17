import {
  ICategory, ICategoryDocument,
  IComment,
  ICommentDocument,
  IDiscount,
  IDiscountDocument,
  IFavorite, IFavoriteDocument,
  IOrder,
  IOrderDocument,
  IProduct, IProductDocument,
  ISession, ISessionDocument,
  ITicket,
  ITicketDocument,
  IUser, IUserDocument
} from "@app/models";
import mongoose from "mongoose";
import { categorySchema } from "./category-schema.ts";
import { commentSchema } from "./commnet-schema.ts";
import { discountSchema } from "./discount-schema.ts";
import { favoriteSchema } from "./favorite.schema.ts";
import { orderSchema } from "./order-schema.ts";
import { productSchema } from "./product-schema.ts";
import { sessionSchema } from "./session-schema.ts";
import { ticketSchema } from "./ticket-schema.ts";
import { userSchema } from "./user.schema.ts";

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

const Discount: mongoose.Model<IDiscountDocument> =
  mongoose.models.Discount || mongoose.model<IDiscount>('Discount', discountSchema);

const Ticket: mongoose.Model<ITicketDocument> =
  mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', ticketSchema);

const Order: mongoose.Model<IOrderDocument> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export const context = {
  product: Product,
  category: Category,
  user: User,
  favorite: Favorite,
  session: Session,
  comment: Comment,
  discount: Discount,
  ticket: Ticket,
  order: Order
};

export async function syncAllIndexes() {
  await context.category.syncIndexes();
  await context.product.syncIndexes();
  await context.user.syncIndexes();
  await context.favorite.syncIndexes();
  await context.session.syncIndexes();
  await context.comment.syncIndexes();
  await context.discount.syncIndexes();
  await context.ticket.syncIndexes();
  await context.order.syncIndexes();
}