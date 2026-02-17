import express from 'express';
import { _200, _400, _401 } from "../_status.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";


export function addUsersDiscountApi(app: express.Express) {

  app.get("/api/user/discounts", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    return _200(res, []);
  });

}