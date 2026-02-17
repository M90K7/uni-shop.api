import { Document, Types } from "mongoose";
import { IUser } from "./user.ts";


export interface IDiscount {
  _id: Types.ObjectId;
  user: IUser | Types.ObjectId;
  code: string;
  percentage: number;
  maxValue: number;
  endAt: string;
}


export interface IDiscountDocument extends IDiscount, Document { }
