import { Document, Types } from "mongoose";

export interface IComment {
  _id: Types.ObjectId;
  replyToId?: Types.ObjectId;
  userAvatar: string;
  userFullName: string;
  userScore?: number;
  comment: string;
  createdAt: Date;
  createdAtFa: Date;
  approved: false;
}

export interface ICommentDocument extends IComment, Document { }