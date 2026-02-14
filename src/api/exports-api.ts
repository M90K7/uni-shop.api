import express from "express";

import { addGeographyApi } from "./geography/geography.api.ts";
import { addProductsApi } from "./products/products.api.ts";
import { addUsersApi } from "./users/users.api.ts";


export function addApis(app: express.Express) {
  addProductsApi(app);
  addUsersApi(app);
  addGeographyApi(app);
}