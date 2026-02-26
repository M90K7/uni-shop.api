
import express from 'express';
import { isAdmin } from "../_auth.ts";
import { _200, _401 } from "../_status.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";
import { createUser, deleteUser, getAllUsers, updateUser } from "./users.logic.ts";


export function addAdminUsersApi(app: express.Express) {
  app.get("/api/users", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);

    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    const users = await getAllUsers();

    return _200(res, users);
  });

  app.post("/api/users", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    const newUser = req.body;
    const createdUser = await createUser(newUser);
    return _200(res, createdUser);
  });

  app.put("/api/users/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);

    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }
    delete req.body._id;
    const user = await updateUser(req.params.id, req.body);

    _200(res, user);
  });

  app.delete("/api/users/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    return _200(res, Boolean(deletedUser));
  });
}