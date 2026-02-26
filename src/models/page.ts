import { Document, Types } from "mongoose";
import { IComment } from "./comment.ts";
import { IProduct } from "./product.ts";

export interface IPage {
  _id: Types.ObjectId;
  name: string;
  mainSectionTitle: string;
  mainSectionProducts: IProduct[] | Types.ObjectId[];
  rightSectionTitle: string;
  rightSectionProducts: IProduct[] | Types.ObjectId[];
  leftSectionTitle: string;
  leftSectionProducts: IProduct[] | Types.ObjectId[];

  categoryTitle: string;
  categoryImagePath: string;

  smSiteIconPath: string;
  mdSiteIconPath: string;
  lgSiteIconPath: string;

  comments: IComment[] | Types.ObjectId[];

  createdAt: Date | string;
  modifiedAt: Date | string;
}

export interface IPageDocument extends IPage, Document<Types.ObjectId> { }