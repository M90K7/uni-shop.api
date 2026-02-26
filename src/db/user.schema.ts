
import { Schema } from "mongoose";
import { IUser } from "../models/index.ts";
import { toFaDate } from "./_convert.ts";

export const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: false },
  role: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  gender: { type: Number, required: false },
  email: { type: String, required: false },
  emailConfirmed: { type: Boolean, default: false },
  phoneNumber: { type: String, required: false },
  phoneNumberConfirmed: { type: Boolean, default: false },
  birthdate: { type: Date, required: false },
  createdAt: { type: Date, default: Date.now, get: toFaDate },
  updatedAt: { type: Date, default: Date.now, get: toFaDate },
  avatarPath: { type: String, default: null },
  provinceOfResidenceId: { type: Number, required: false },
  cityOfResidenceId: { type: Number, required: false },
  addressOfResidence: { type: String, required: false },
  postalCodeOfResidence: { type: String, required: false },
  isAvailable: { type: Boolean, default: true },
  userBankAccounts: { type: [Object], default: [] },
  carts: { type: [String], default: [] }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});