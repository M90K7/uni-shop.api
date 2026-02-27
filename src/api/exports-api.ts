import express from "express";

import { addAdminCategoriesApi } from "./categories/categories.admin.api.ts";
import { addAdminCommentsApi } from "./comments/comments.admin.api.ts";
import { addFavoritesApi } from "./favorites/favorites.api.ts";
import { addGeographyApi } from "./geography/geography.api.ts";
import { addOrdersApi } from "./orders/orders.api.ts";
import { addAdminHomePagesApi } from "./pages/pages.admin.api.ts";
import { addHomePagesApi } from "./pages/pages.api.ts";
import { addAdminProductsApi } from "./products/products.admin.api.ts";
import { addProductsApi } from "./products/products.api.ts";
import { addAdminUsersApi } from "./users/users.admin.api.ts";
import { addUsersApi } from "./users/users.api.ts";
import { addCategoriesApi } from "./categories/categories.api.ts";


export function addApis(app: express.Express) {
  addCategoriesApi(app);
  addFavoritesApi(app);
  addProductsApi(app);
  addUsersApi(app);
  addGeographyApi(app);
  addOrdersApi(app);
  addHomePagesApi(app);
  
  addAdminCategoriesApi(app);
  addAdminCommentsApi(app);
  addAdminUsersApi(app);
  addAdminProductsApi(app);
  addAdminHomePagesApi(app);
}