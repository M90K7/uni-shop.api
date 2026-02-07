import { Document } from "mongoose";

export interface ICategory {
  _id: string;
  persianTitle: string;
  englishTitle?: string;
  imagePath?: string;
  url: string;
}

export interface ICategoryDocument extends ICategory, Document<string> { }