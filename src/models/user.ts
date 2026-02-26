import { Document, Types } from 'mongoose';


export interface UserBankAccount {
  id?: number;
  cardNumber: string;
  shabaNumber: string;
  verified?: boolean;
}

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
  createdAt: Date | string;
  updatedAt: Date | string;
  avatarPath: string;
  provinceOfResidenceId: number;
  cityOfResidenceId: number;
  addressOfResidence: string;
  postalCodeOfResidence: string;
  isAvailable: boolean;
  userBankAccounts: UserBankAccount[];
  // شناسه های محصول سبد خرید
  carts: string[];
}

export interface IUserDocument extends IUser, Document { }