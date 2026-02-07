import { addCart, getCart } from "@app/cart";
import { IProduct, IUserDocument } from "@app/models";
import { createSession, getSessionIdFromToken, removeSession } from "@app/session";
import express from 'express';
import { addProductInFavorites, isProductInFavorites, removeProductInFavorites } from "../favorites/favorites.logic.ts";
import { getProductById } from "../products/products.logic.ts";
import { getUserById, login } from "./users.logic.ts";

export function addUsersApi(app: express.Express) {

  app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await login({ username, password });
    if (user) {
      createSession(user._id.toString());
    }
    res.json({
      result: user ? createSessionUser(user) : null,
      isError: !user,
      message: user ? "Login successful" : "Login failed"
    });
  });

  app.post("/api/auth/logout", (req, res) => {
    const { userId } = req.body;
    removeSession(userId);
    res.json({
      result: true,
      isError: false,
      message: "Logout successful"
    });
  });

  app.get("/api/user/info", async (req, res) => {
    const sId = getSessionIdFromToken(req.headers.authorization);
    if (!sId) {
      return res.status(401).json({
        result: null,
        isError: true,
        message: "Unauthorized"
      });
    }
    const user = await getUserById(sId);
    res.json({
      result: user ? createSessionUser(user) : null,
      isError: false,
      message: "User information retrieved successfully"
    });
  });

  app.get("/api/user/shopping-cart", (req, res) => {
    const uId = getSessionIdFromToken(req.headers.authorization);
    if (!uId) {
      return res.status(401).json({
        result: null,
        isError: true,
        message: "Unauthorized"
      });
    }
    return res.json({
      result: getCart(uId),
      isError: false,
      message: "User shopping cart retrieved successfully"
    });
  });

  app.post("/api/user/shopping-cart", async (req, res) => {
    const uId = getSessionIdFromToken(req.headers.authorization);
    if (!uId) {
      return res.status(401).json({
        result: null,
        isError: true,
        message: "Unauthorized"
      });
    }
    const product = await getProductById(req.body.productId);
    addCart(uId, product as IProduct);
    return res.json({
      result: getCart(uId),
      isError: false,
      message: "User shopping cart retrieved successfully"
    });
  });

  app.get("/api/user/products/:id", async (req, res) => {
    const uId = getSessionIdFromToken(req.headers.authorization);
    if (!uId) {
      return res.status(401).json({
        result: null,
        isError: true,
        message: "Unauthorized"
      });
    }
    const isFavorite = await isProductInFavorites(uId, req.params.id);
    return res.json({
      result: {
        isFavorite
      },
      isError: false,
      message: "User favorite status retrieved successfully"
    });
  });
  app.post("/api/user/favorites/:id", async (req, res) => {
    const uId = getSessionIdFromToken(req.headers.authorization);
    if (!uId) {
      return res.status(401).json({
        result: null,
        isError: true,
        message: "Unauthorized"
      });
    }
    const isFavorite = await isProductInFavorites(uId, req.params.id);
    if (isFavorite) {
      const fav = await removeProductInFavorites(uId, req.params.id);
      return res.json({
        result: true,
        isError: false,
        message: "User favorite product removed successfully"
      });
    }

    const fav = await addProductInFavorites(uId, req.params.id);
    return res.json({
      result: fav,
      isError: false,
      message: "User favorite product added successfully"
    });
  });
}

function createSessionUser(user: IUserDocument) {
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
      exp: Date.now() + 1000 * 60 * 60, // 1 hour
      sid: user._id.toString(),
      name: user.username,
      given_name: user.username,
      role: user.role
    },
    user: {
      id_token: user._id,
      access_token: user._id,
      expires_at: Date.now() + 1000 * 60 * 60, // 1 hour
    }
  };

}