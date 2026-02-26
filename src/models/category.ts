import { Document, Types } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  persianTitle: string;
  englishTitle?: string;
  url: string;
  isAvailable: boolean;
  createdAt: Date | string;
  modifiedAt: Date | string;
  order: number;
}

export interface ICategoryDocument extends ICategory, Document<Types.ObjectId> { }