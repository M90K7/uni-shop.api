
import { Schema } from "mongoose";
import { IUser } from "../models/index.ts";

export const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: false },
  emailConfirmed: { type: Boolean, default: false },
  phoneNumber: { type: String, required: false },
  phoneNumberConfirmed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  avatarPath: { type: String, default: "user" },
  carts: { type: [String], default: [] }
});