import { Schema } from "mongoose";
import { ICategory } from "../models/category.ts";

export const categorySchema = new Schema<ICategory>({
  persianTitle: { type: String, required: true },
  englishTitle: { type: String, required: false },
  imagePath: { type: String, required: false },
  url: { type: String, required: true },
});