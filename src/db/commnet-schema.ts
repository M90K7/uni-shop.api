import { ICommentDocument } from "@app/models";
import { Schema } from "mongoose";
import { toFaDate } from "./_convert.ts";

export const commentSchema = new Schema<ICommentDocument>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  replyToId: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userFullName: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  userScore: { type: Number, default: null },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, get: toFaDate },
  modifiedAt: { type: Date, default: Date.now, get: toFaDate },
  approved: { type: Boolean, default: true },
}, {
  toJSON: { getters: true },
  toObject: { getters: true },
});
