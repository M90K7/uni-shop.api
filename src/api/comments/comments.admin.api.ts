import express from "express";
import { isAdmin } from "../_auth.ts";
import { _200, _401 } from "../_status.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";
import {
  deleteComment,
  getAllComments,
  updateComment,
} from "./comments.logic.ts";

export function addAdminCommentsApi(app: express.Express) {
  app.get("/api/admin/comments", async (req, res) => {
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

  app.put("/api/admin/comments/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    delete req.body._id;
    const updatedComment = await updateComment(req.params.id, req.body);
    return _200(res, updatedComment);
  });

  app.delete("/api/admin/comments/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    const { id } = req.params;
    const deletedComment = await deleteComment(id);
    return _200(res, Boolean(deletedComment));
  });
}
