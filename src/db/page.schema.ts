import { IPage } from "@app/models";
import { Schema } from "mongoose";
import { toFaDate } from "./_convert.ts";

export const pageSchema = new Schema<IPage>({
  name: { type: String, required: true },
  mainSectionTitle: { type: String },
  mainSectionProducts: { type: [Schema.Types.ObjectId], ref: "Product", default: [] },
  mainSectionActive: {type: Boolean, default: true},
  rightSectionTitle: { type: String },
  rightSectionProducts: { type: [Schema.Types.ObjectId], ref: "Product", default: [] },
  rightSectionActive: {type: Boolean, default: true},
  leftSectionTitle: { type: String },
  leftSectionProducts: { type: [Schema.Types.ObjectId], ref: "Product", default: [] },
  leftSectionActive: {type: Boolean, default: true},
  categoryTitle: { type: String },
  categoryImagePath: { type: String },
  smSiteIconPath: { type: String },
  mdSiteIconPath: { type: String },
  lgSiteIconPath: { type: String },
  comments: { type: [Schema.Types.ObjectId], ref: "Comment", default: [] },
  createdAt: { type: Date, default: Date.now, get: toFaDate },
  modifiedAt: { type: Date, default: Date.now, get: toFaDate }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});