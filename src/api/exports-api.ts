import express from "express";

import { addCategoriesApi } from "./categories/categories.api.ts";
import { addCommentsApi } from "./comments/comments.api.ts";
import { addFavoritesApi } from "./favorites/favorites.api.ts";
import { addGeographyApi } from "./geography/geography.api.ts";
import { addOrdersApi } from "./orders/orders.api.ts";
import { addProductsApi } from "./products/products.api.ts";
import { addUsersApi } from "./users/users.api.ts";


export function addApis(app: express.Express) {
  addCategoriesApi(app);
  addCommentsApi(app);
  addFavoritesApi(app);
  addProductsApi(app);
  addUsersApi(app);
  addGeographyApi(app);
  addOrdersApi(app);
}