


import express from 'express';
import { isAdmin } from "../_auth.ts";
import { _200, _401 } from "../_status.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";
import { getAllSumProductFavorites } from "./favorites.logic.ts";


export function addFavoritesApi(app: express.Express) {

  app.get("/api/favorites/group-by-products", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    const groups = await getAllSumProductFavorites();

    return _200(res, groups);
  });
}