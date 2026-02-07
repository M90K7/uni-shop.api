import { context } from "@app/db";
import { ApiFilter, IProduct } from "@app/models";

export async function addProduct(product: IProduct) {
  return await context.product.create(product);
}

export function getAllProducts({ sorts, search, minPrice, maxPrice, category }: ApiFilter) {
  console.log('Fetching all products');
  const query: any = {};

  if (search && search.trim()) {
    // query persianTitle or keywords
    query.$or = [
      {
        persianTitle: {
          $regex: search.split(' ').join('.*'),
          $options: 'i'
        }
      },
      {
        keywords: {
          $in: search.split(' ').map((word) => new RegExp(word, 'i'))
        }
      }
    ];
  }
  if (minPrice) {
    query.price = {
      $gte: parseFloat(minPrice)
    };
  }
  if (maxPrice) {
    query.price = {
      ...query.price,
      $lte: parseFloat(maxPrice)
    };
  }
  if (category && category !== "-1") {
    // category is ObjectId
    query.category = category;
  }
  const sort: any = {};
  if (sorts === "-date") {
    // sort.createdAt = -1;
  }
  else if (sorts === "-views") {
    sort.scoreCount = -1;
  } else if (sorts === "-score") {
    sort.score = -1;
  } else if (sorts === "price") {
    sort.price = 1;
  }

  return context.product.find(query).populate("category").sort(sort).exec();
}

export function getProductsWithHigherScore() {
  console.log('Fetching all products with higher score');
  return context.product.find().populate("category").sort({ score: -1 }).limit(10).exec();
}

export function getProductById(id: string) {
  console.log(`Fetching product with id: ${id}`);
  return context.product.findById(id).populate("category").exec();
}

export function getProductByCategoryId(categoryId: string, notProductId: string) {
  console.log(`Fetching product with category id: ${categoryId}`);
  return context.product.find({ category: categoryId, _id: { $ne: notProductId } }).populate("category").exec();
}