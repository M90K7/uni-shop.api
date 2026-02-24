import { ISessionDocument } from "@app/models";
import { Schema } from "mongoose";

export const sessionSchema = new Schema<ISessionDocument>({
  userId: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  expiresAt: { type: Date, required: true },
});
