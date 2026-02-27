
import express from 'express';
import { _200, _401 } from "../_status.ts";
import { getAllCategories } from "./categories.logic.ts";


export function addCategoriesApi(app: express.Express) {

  app.get("/api/categories", async (_, res) => {
    const categories = await getAllCategories();

    return _200(res, categories);
  });

}