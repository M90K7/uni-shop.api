
import express from 'express';
import { isAdmin } from "../_auth.ts";
import { _200, _401 } from "../_status.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "./categories.logic.ts";


export function addCategoriesApi(app: express.Express) {

  app.get("/api/categories", async (_, res) => {
    const categories = await getAllCategories();

    return _200(res, categories);
  });

  app.post("/api/categories", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    const newCategory = req.body;
    const createdCategory = await createCategory(newCategory);
    return _200(res, createdCategory);
  });

  app.put("/api/categories/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    delete req.body._id;
    const updatedCategory = await updateCategory(req.params.id, req.body);
    return _200(res, updatedCategory);
  });

  app.delete("/api/categories/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    const { id } = req.params;
    const deletedCategory = await deleteCategory(id);
    return _200(res, Boolean(deletedCategory));
  });

}