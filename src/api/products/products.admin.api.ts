
import express from 'express';
import { isAdmin } from "../_auth.ts";
import { _200, _401, _500 } from "../_status.ts";
import { uploadProductFile } from "../_upload.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";
import { addProduct, deleteProduct, deleteProductImage, getProductById, updateProduct } from "./products.logic.ts";

export function addAdminProductsApi(app: express.Express) {

  app.post('/api/products', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const session = await validateSessionByToken(req.headers.authorization);

      if (!session) {
        return _401(res);
      }

      if (!isAdmin(session)) {
        return _401(res);
      }

      const model = req.body;
      delete model._id;

      const result = await addProduct(model);
      _200(res, result);
    } catch (error) {
      next(error);
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);

    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    delete req.body._id;

    const product = await updateProduct(req.params.id, req.body);

    _200(res, product);
  });

  app.delete("/api/products/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);

    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    const product = await deleteProduct(req.params.id);
    product && product.imagePath && deleteProductImage(product.imagePath);

    _200(res, Boolean(product));
  });

  /**
   * Route for uploading a file for a specific product by ID.
   * Implementation pending.
   */
  app.post(
    '/api/products/upload/:id',
    uploadProductFile.single('file'),
    async (req, res) => {
      const session = await validateSessionByToken(req.headers.authorization);

      if (!session) {
        return _401(res);
      }

      if (!isAdmin(session)) {
        return _401(res);
      }

      try {
        const productId = req.params.id;

        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

        // مسیر فایل ذخیره‌شده
        const imagePath = `products/${req.file.filename}`;

        const oldProduct = await getProductById(productId as string);

        // آپدیت محصول
        const product = await updateProduct(productId as string, { imagePath });

        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }

        if (oldProduct && oldProduct.imagePath) {
          await deleteProductImage(oldProduct.imagePath);
        }

        _200(res, { imagePath }, 'File uploaded successfully');
      } catch (err) {
        _500(res, 'Upload failed');
      }
    }
  );

}
