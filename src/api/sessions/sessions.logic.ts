import { context } from "@app/db";
import { ISessionDocument } from "@app/models";
import * as express from "express";

// add session
export function addSession(userId: string, req: express.Request): Promise<ISessionDocument> {
  const newSession = new context.session({
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    isActive: true,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });
  return newSession.save();
}

// remove session
export function removeSession(sessionId: string): Promise<ISessionDocument | null> {
  return context.session.findByIdAndDelete(sessionId).exec();
}

// find session by id
export function findSessionById(sessionId: string): Promise<ISessionDocument | null> {
  return context.session.findById(sessionId).exec();
}

// find session by token
export async function validateSessionByToken(token?: string): Promise<ISessionDocument | null> {

  if (!token) return null;
  const id = token.split(" ")[1];
  if (id) {
    const session = await context.session.findById(id).exec();
    if (session && session.isActive && session.expiresAt > new Date()) {
      return session;
    }
  }
  return null;
}

// find session by user id
export function findSessionByUserId(userId: string): Promise<ISessionDocument | null> {
  return context.session.findOne({ userId }).exec();
}

// stop session
export function disableSession(sessionId: string): Promise<ISessionDocument | null> {
  return context.session.findByIdAndUpdate(sessionId, { isActive: false }).exec();
}