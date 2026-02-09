import { Document, Types } from "mongoose";

export interface IFavorite {
  _id: Types.ObjectId;
  userId: string;
  productId: string;
  createdAt: number;
}

export interface IFavoriteDocument extends IFavorite, Document { }