import { ICategory } from "@app/models";
import { Schema } from "mongoose";
import { toFaDate } from "./_convert.ts";

export const categorySchema = new Schema<ICategory>({
  persianTitle: { type: String, required: true },
  englishTitle: { type: String, required: false },
  url: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now, get: toFaDate },
  modifiedAt: { type: Date, default: Date.now, get: toFaDate },
  order: { type: Number, required: true, default: 0 }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});
