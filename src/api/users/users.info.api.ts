import { addCart, getCarts, removeCart } from "@app/cart";
import { IProduct, ISessionDocument, IUserDocument, ProductUserScore } from "@app/models";
import express from 'express';
import { _200, _400, _401 } from "../_status.ts";
import { addComment } from "../comments/comments.logic.ts";
import { addProductInFavorites, isProductInFavorites, removeProductInFavorites } from "../favorites/favorites.logic.ts";
import { findUserScoreInProduct, getProductById, updateUserScoreProduct } from "../products/products.logic.ts";
import { addSession, disableSession, validateSessionByToken } from "../sessions/sessions.logic.ts";
import { getUserById, login, updateUser } from "./users.logic.ts";


export function addUsersInfoApi(app: express.Express) {

  app.post("/api/user/info/name", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    const { firstName, lastName, gender } = req.body;

    const user = await updateUser(session.userId, { firstName, lastName, gender });

    return _200(res, Boolean(user));
  });


}