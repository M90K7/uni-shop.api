
export interface SessionData {
  userId: string;
  createdAt: number;
}

const sessions = new Map<string, SessionData>();

export function createSession(userId: string) {

  sessions.set(userId, {
    userId,
    createdAt: Date.now()
  });

}

export function removeSession(userId: string) {
  return sessions.delete(userId);
}

export function isValidSession(userId: string) {
  return sessions.has(userId);
}

export function getSessionIdFromToken(token?: string) {
  if (!token) return null;
  const id = token.split(" ")[1];
  return sessions.has(id) ? id : null;
}

