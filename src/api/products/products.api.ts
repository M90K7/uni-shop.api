import express from 'express';
import { addProduct, getAllProducts } from "./products.logic.ts";

export function addProductsApi(app: express.Express) {

  app.post('/api/products/add', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const model = req.body;
      const result = await addProduct(model);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/products', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const filters = req.body;
      const products = await getAllProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/product/popular", async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
      const filters = req.body;
      const products = await getAllProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }

  });
}

