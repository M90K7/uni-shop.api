import { Schema } from "mongoose";
import { ITicket, TicketStatus, TicketType } from "../models/ticket.ts";


export const ticketSchema = new Schema<ITicket>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  replyToId: { type: Number, default: null },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  lastUpdate: { type: Date, required: true, default: Date.now },
  status: { type: Number, enum: TicketStatus, default: TicketStatus.Open },
  department: { type: Number, enum: TicketType, default: TicketType.Other },
  replies: [{
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
  }]
});