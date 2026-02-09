import { addCart, getCarts, removeCart } from "@app/cart";
import { IProduct, ISessionDocument, IUserDocument } from "@app/models";
import express from 'express';
import { addProductInFavorites, isProductInFavorites, removeProductInFavorites } from "../favorites/favorites.logic.ts";
import { getProductById } from "../products/products.logic.ts";
import { addSession, disableSession, validateSessionByToken } from "../sessions/sessions.logic.ts";
import { getUserById, login } from "./users.logic.ts";

export function addUsersApi(app: express.Express) {

  app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await login({ username, password });
    if (!user) {
      return res.status(400).json({
        result: null,
        isError: true,
        message: "Login failed"
      });
    }
    const session = await addSession(user._id.toString(), req);
    res.json({
      result: user ? createSessionUser(user, session) : null,
      isError: !user,
      message: user ? "Login successful" : "Login failed"
    });
  });

  app.post("/api/auth/logout", async (req, res) => {
    const { userId } = req.body;
    await disableSession(userId);
    res.json({
      result: true,
      isError: false,
      message: "Logout successful"
    });
  });

  app.get("/api/user/info", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }
    const user = await getUserById(session.userId);
    res.json({
      result: user ? createSessionUser(user, session) : null,
      isError: false,
      message: "User information retrieved successfully"
    });
  });

  app.get("/api/user/shopping-cart", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }
    return res.json({
      result: await getCarts(session.userId),
      isError: false,
      message: "User shopping cart retrieved successfully"
    });
  });

  app.post("/api/user/shopping-cart", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }
    const product = await getProductById(req.body.productId);
    await addCart(session.userId, product as IProduct);
    return res.json({
      result: await getCarts(session.userId),
      isError: false,
      message: "User shopping cart retrieved successfully"
    });
  });

  app.delete("/api/user/shopping-cart/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }
    const up = await removeCart(session.userId, req.params.id);
    return res.json({
      result: Boolean(up),
      isError: false,
      message: "User shopping cart removed successfully"
    });
  });

  app.get("/api/user/products/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }
    const isFavorite = await isProductInFavorites(session.userId, req.params.id);
    return res.json({
      result: {
        isFavorite,
        isRegistered: true
      },
      isError: false,
      message: "User favorite status retrieved successfully"
    });
  });
  app.post("/api/user/favorites/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }
    const isFavorite = await isProductInFavorites(session.userId, req.params.id);
    if (isFavorite) {
      const fav = await removeProductInFavorites(session.userId, req.params.id);
      return res.json({
        result: fav,
        isError: false,
        message: "User favorite product removed successfully"
      });
    }

    const fav = await addProductInFavorites(session.userId, req.params.id);
    return res.json({
      result: fav,
      isError: false,
      message: "User favorite product added successfully"
    });
  });
}

function createSessionUser(user: IUserDocument, session: ISessionDocument) {
  return {
    detail: {
      ...user.toObject({}),
      id: user._id,
      userId: user._id,
      password: null,
    },
    profile: {
      iss: user._id.toString(),
      sub: user._id.toString(),
      exp: session.expiresAt,
      sid: user._id.toString(),
      name: user.username,
      given_name: user.username,
      role: user.role
    },
    user: {
      id_token: user._id,
      access_token: session._id,
      expires_at: session.expiresAt
    }
  };

}

function _401(res: express.Response) {
  return res.status(401).json({
    result: null,
    isError: true,
    message: "Unauthorized"
  });
}