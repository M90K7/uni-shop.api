import { addCart, getCarts, removeCart } from "@app/cart";
import { IProduct, ISessionDocument, IUserDocument, ProductUserScore } from "@app/models";
import express from 'express';
import { _200, _400, _401 } from "../_status.ts";
import { addComment, getUserComments } from "../comments/comments.logic.ts";
import { addProductInFavorites, getProductsInFavorites, isProductInFavorites, removeProductInFavorites } from "../favorites/favorites.logic.ts";
import { findUserScoreInProduct, getProductById, updateUserScoreProduct } from "../products/products.logic.ts";
import { addSession, disableSession, validateSessionByToken } from "../sessions/sessions.logic.ts";
import { addUsersDiscountApi } from "./users.discount.api.ts";
import { addUsersInfoApi } from "./users.info.api.ts";
import { getUserById, login } from "./users.logic.ts";
import { addUsersTicketApi } from "./users.ticket.api.ts";

export function addUsersApi(app: express.Express) {

  addUsersInfoApi(app);
  addUsersDiscountApi(app);
  addUsersTicketApi(app);

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

  app.get("/api/user/products", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }
    return res.json({
      result: [],
      isError: false,
      message: "User products retrieved successfully"
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

  app.post("/api/user/products/:id/comment", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }
    const user = await getUserById(session.userId);
    if (!user) {
      return _401(res);
    }
    const { comment, replyToId } = req.body;
    if (!comment) {
      return _400(res, "Comment is required");
    }

    const data = await addComment(user, req.params.id, comment, replyToId);
    return _200(res, data, "Comment added successfully");
  });

  app.get("/api/user/products/:id/score", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }
    const user = await getUserById(session.userId);
    if (!user) {
      return _401(res);
    }
    const product = await findUserScoreInProduct(session.userId, req.params.id);
    return _200(res, product?.userScores?.get(session.userId));
  });

  app.post("/api/user/products/:id/score", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }
    const user = await getUserById(session.userId);
    if (!user) {
      return _401(res);
    }
    const product = await getProductById(req.params.id);
    if (!product) {
      return _400(res, "Product not found");
    }
    const { contentScore, priceScore, supportScore, productScore } = req.body;

    const scoreCount = (product.scoreCount || 0) + 1;
    const userAvg = (contentScore + priceScore + supportScore + productScore) / 4;
    const avgUserScores: ProductUserScore = {
      contentScore: ((product.avgUserScores?.contentScore || 0) + contentScore) / scoreCount,
      priceScore: ((product.avgUserScores?.priceScore || 0) + priceScore) / scoreCount,
      supportScore: ((product.avgUserScores?.supportScore || 0) + supportScore) / scoreCount,
      productScore: ((product.avgUserScores?.productScore || 0) + productScore) / scoreCount
    };
    const avg = ((product.score || 0) + userAvg) / scoreCount;

    await updateUserScoreProduct(session.userId, product._id.toString(), avg, scoreCount, avgUserScores, {
      contentScore,
      priceScore,
      supportScore,
      productScore
    });

    return _200(res, true);
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

  app.get("/api/user/favorites", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);

    if (!session) {
      return _401(res);
    }
    const favs = await getProductsInFavorites(session.userId);

    return res.json({
      result: favs.map(f => f.product),
      isError: false,
      message: "User favorite product added successfully"
    });
  });

  app.get("/api/user/comments", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);

    if (!session) {
      return _401(res);
    }
    const comments = await getUserComments(session.userId);

    return res.json({
      result: comments,
      isError: false,
      message: "User comments retrieved successfully"
    });
  });

  app.get("/api/user/factors", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);

    if (!session) {
      return _401(res);
    }

    return res.json({
      result: [],
      isError: false,
      message: "User factors retrieved successfully"
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
      fullName: (`${user.firstName || ''} ${user.lastName || ''}`).trim()
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

