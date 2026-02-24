import { Document, Types } from "mongoose";

export interface ISession {
  _id: Types.ObjectId;
  userId: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  ip: string;
  userAgent: string;
  isActive: boolean;
  expiresAt: Date;
}

export interface ISessionDocument extends ISession, Document { }
