import { Document } from "mongoose";

export interface IFavorite {
  _id: string;
  userId: string;
  productId: string;
  createdAt: number;
}

export interface IFavoriteDocument extends IFavorite, Document<string> { }