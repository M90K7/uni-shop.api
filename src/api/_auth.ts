import { ISession } from "@app/models";


export function isAdmin(session: ISession | null): boolean {
  return session?.role === "admin";
}

export function isCustomer(session: ISession | null): boolean {
  return session?.role === "customer";
}