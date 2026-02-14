import { Document, Types } from "mongoose";
import { IProduct } from "./product.ts";
import { IUser } from "./user.ts";

export interface IFavorite {
  _id: Types.ObjectId;
  user: IUser | Types.ObjectId;
  product: IProduct | Types.ObjectId;
  createdAt: number;
}

export interface IFavoriteDocument extends IFavorite, Document { }