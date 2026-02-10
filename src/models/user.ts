import { Document, Types } from 'mongoose';


export interface IUser {
  _id: Types.ObjectId;
  username: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  gender: number;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  birthdate: Date;
  educationDegree: number;
  educationMajor: string;
  createdAt: Date;
  updatedAt: Date;
  avatarPath: string;
  provinceOfResidenceId: number;
  cityOfResidenceId: number;
  addressOfResidence: string;
  postalCodeOfResidence: string;
  // شناسه های محصول سبد خرید
  carts: string[];
}

export interface IUserDocument extends IUser, Document { }