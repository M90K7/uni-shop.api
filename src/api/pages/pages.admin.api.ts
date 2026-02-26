import express from 'express';
import { isAdmin } from "../_auth.ts";
import { _200, _401 } from "../_status.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";
import { getPage } from "./pages.logic.ts";


export function addAdminHomePagesApi(app: express.Express) {

  app.get("/api/page/home", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    const page = await getPage("home");

    _200(res, page);
  });
}