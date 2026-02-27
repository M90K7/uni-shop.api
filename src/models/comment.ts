import { Document, Types } from "mongoose";
import { IProduct } from "./product.ts";
import { IUser } from "./user.ts";

export interface IComment {
  _id: Types.ObjectId;
  user: IUser | Types.ObjectId;
  product: IProduct | Types.ObjectId;
  replyToId?: Types.ObjectId;
  userFullName: string;
  comment: string;
  userScore?: number;
  createdAt: Date | string;
  modifiedAt: Date | string;
  approved: boolean;
}

export interface ICommentDocument extends IComment, Document { }