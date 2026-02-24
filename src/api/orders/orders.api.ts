import express from 'express';
import { isAdmin } from "../_auth.ts";
import { _200, _401 } from "../_status.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";
import { getAllOrders } from "./orders.logic.ts";


export function addOrdersApi(app: express.Express) {
  app.get("/api/orders", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    const orders = await getAllOrders();
    return _200(res, orders);
  });
}