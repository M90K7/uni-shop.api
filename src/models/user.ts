import { Document } from 'mongoose';


export interface IUser {
  username: string;
  password: string;
  role: string;
  fullName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
  avatarPath: string;
}

export interface IUserDocument extends IUser, Document { }