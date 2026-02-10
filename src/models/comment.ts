import { Document, Types } from "mongoose";

export interface IComment {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  replyToId?: Types.ObjectId;
  userFullName: string;
  comment: string;
  userScore?: number;
  createdAt: Date;
  createdAtFa: Date;
  approved: boolean;
}

export interface ICommentDocument extends IComment, Document { }