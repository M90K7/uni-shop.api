import { context } from "../../db/index.ts";
import { useDb } from "../../db/use-db.ts";
import { IProduct } from "../../models/index.ts";

export async function addProduct(product: IProduct) {
  return await context.product.create(product);
}

export async function getAllProducts() {
  await useDb();
  console.log('Fetching all products');
  return context.product.find().exec(); // lean() برای افزایش سرعت و خروجی JSON خالص
}

export async function getProductById(id: string) {
  await useDb();
  console.log(`Fetching product with id: ${id}`);
  return context.product.findById(id).exec();
}