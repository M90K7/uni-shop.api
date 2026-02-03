import express from 'express';
import { addProduct, getAllProducts, getProductsWithHigherScore } from "./products.logic.ts";

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

  app.get('/api/products', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const products = await getAllProducts(req.query);
      res.json({
        result: {
          records: products,
          totalCount: products.length
        }
      });
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/product/popular", async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
      // const filters = req.body;
      const products = await getProductsWithHigherScore();
      res.json({
        result: products
      });
    } catch (err) {
      next(err);
    }
  });
  app.get("/api/product/special", async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
      // const filters = req.body;
      const products = await getProductsWithHigherScore();
      res.json({
        result: products
      });
    } catch (err) {
      next(err);
    }
  });
}

