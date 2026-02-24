
import express from 'express';
import { isAdmin } from "../_auth.ts";
import { _200, _401 } from "../_status.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";
import { getAllComments } from "./comments.logic.ts";


export function addCommentsApi(app: express.Express) {

  app.get("/api/comments", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    const comments = await getAllComments();

    return _200(res, comments);
  });
}