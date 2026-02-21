import express from 'express';
import { _200, _400, _401 } from "../_status.ts";
import { addOrder, getOrderById, getUserOrders } from "../orders/orders.logic.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";
import { clearCarts } from "./users.carts.logic.ts";


export function addUsersFactorApi(app: express.Express) {

  app.get("/api/user/factors", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);

    if (!session) {
      return _401(res);
    }

    const orders = await getUserOrders(session.userId);

    return res.json({
      result: orders,
      isError: false,
      message: "User factors retrieved successfully"
    });
  });

  app.post("/api/user/factors", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);

    if (!session) {
      return _401(res);
    }

    const order = await addOrder(session.userId);

    if (order == null) {
      return _400(res, "Failed to create order");
    }

    await clearCarts(session.userId);

    return res.json({
      result: order._id,
      isError: false,
      message: "User factors retrieved successfully"
    });
  });

  app.get("/api/user/factors/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);

    if (!session) {
      return _401(res);
    }

    const order = await getOrderById(req.params.id);

    return res.json({
      result: order,
      isError: false,
      message: "User factors retrieved successfully"
    });
  });
}