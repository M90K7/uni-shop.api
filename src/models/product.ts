import { Document, ObjectId, Types } from 'mongoose';
import { ICategory } from "./category.ts";

export interface ProductAttribute {
  title: string;
  value: string;
}

export interface ProductUserScore {
  contentScore: number;
  priceScore: number;
  supportScore: number;
  productScore: number;
}

export interface IProduct {
  _id: Types.ObjectId;
  persianTitle: string;
  englishTitle?: string;
  description: string;
  url: string;
  price: number;
  priceAfterDiscount?: number;
  discountAmount?: number;
  score?: number;
  scoreCount?: number;
  imagePath: string;
  category: ICategory | Types.ObjectId;
  isAvailable: boolean;
  attributes: Map<string, ProductAttribute>;
  keywords: string[];
  avgUserScores: ProductUserScore;
  userScores: Map<string, ProductUserScore>;
  createdAt: Date | string;
  modifiedAt: Date | string;
}

export interface IProductDocument extends IProduct, Document { }