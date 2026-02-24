import { Document, Types } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  persianTitle: string;
  englishTitle?: string;
  imagePath?: string;
  url: string;
}

export interface ICategoryDocument extends ICategory, Document<Types.ObjectId> { }