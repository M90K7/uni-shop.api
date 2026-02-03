import { context } from "../../db/index.ts";
import { useDb } from "../../db/use-db.ts";
import { ApiFilter, IProduct } from "../../models/index.ts";

export async function addProduct(product: IProduct) {
  return await context.product.create(product);
}

export async function getAllProducts({ sort, search }: ApiFilter) {
  console.log('Fetching all products');
  const query: any = {};

  if (search && search.trim()) {
    query.persianTitle = {
      $regex: search.split(' ').join('.*'),
      $options: 'i'
    };
  }
  return context.product.find(query).populate("category").sort({ createdAt: sort === '-date' ? -1 : 1 }).exec();
}

export async function getProductsWithHigherScore() {
  console.log('Fetching all products with higher score');
  return context.product.find().populate("category").sort({ score: -1 }).limit(10).exec();
}

export async function getProductById(id: string) {
  console.log(`Fetching product with id: ${id}`);
  return context.product.findById(id).populate("category").exec();
}