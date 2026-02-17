import { Document, Types } from "mongoose";
import { IUser } from "./user.ts";

export enum TicketStatus {
  // [Display(Name = "در انتظار پاسخ")]
  Open = 0,
  // [Display(Name = "پاسخ داده شده")]
  Answered = 1,
  // [Display(Name = "بسته شده")]
  Closed = 2
}

export enum TicketType {
  // [Display(Name = "مالی")]
  Financial = 1,
  // [Display(Name = "نرم افزار")]
  Software = 2,
  // [Display(Name = "سایر")]
  Other = 3
}


export interface TicketReply {
  user: IUser | Types.ObjectId;
  description: string;
  createdAt: string;
}

export interface ITicket {
  _id: Types.ObjectId;
  user: IUser | Types.ObjectId;
  replyToId: number | null;
  title: string;
  description: string;
  createdAt: Date;
  lastUpdate: Date;
  status: TicketStatus;
  department: TicketType;
  replies: TicketReply[];
  statusTitle: string;
  departmentTitle: string;
}

export interface ITicketDocument extends ITicket, Document { }
