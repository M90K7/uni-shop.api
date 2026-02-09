import { Document, ObjectId } from "mongoose";

export interface ICategory {
  _id: ObjectId;
  persianTitle: string;
  englishTitle?: string;
  imagePath?: string;
  url: string;
}

export interface ICategoryDocument extends ICategory, Document<ObjectId> { }