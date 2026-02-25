
import express from 'express';
import { isAdmin } from "../_auth.ts";
import { _200, _401 } from "../_status.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";
import { deleteProduct, updateProduct } from "./products.logic.ts";

export function addProductsAdminApi(app: express.Express) {
  app.put("/api/products/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);

    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    delete req.body._id;

    const product = await updateProduct(req.params.id, req.body);

    _200(res, product);
  });

  app.delete("/api/products/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);

    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    const product = await deleteProduct(req.params.id);

    _200(res, product);
  });
}
