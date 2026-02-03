import { Document } from 'mongoose';

export interface ProductAttribute {
  title: string;
  value: string;
}

export interface IProduct {
  persianTitle: string;
  englishTitle?: string;
  url: string;
  price: number;
  priceAfterDiscount?: number;
  discountAmount?: number;
  score?: number;
  scoreCount?: number;
  imagePath: string;
  category: string;
  isAvailable: boolean;
  attributes: Map<string, ProductAttribute>;
  keywords: string[];
}

export interface IProductDocument extends IProduct, Document { }