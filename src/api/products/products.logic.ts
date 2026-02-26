import { context } from "@app/db";
import { ApiFilter, IProduct, IProductDocument, ProductUserScore } from "@app/models";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

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
    sort.modifiedAt = -1;
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

export function getProductByIds(ids: string[]) {
  console.log(`Fetching product with id: ${ids}`);
  return context.product.find({ _id: { $in: ids } }).exec();
}

export function getProductByCategoryId(categoryId: string, notProductId: string) {
  console.log(`Fetching product with category id: ${categoryId}`);
  return context.product.find({ category: categoryId, _id: { $ne: notProductId } }).populate("category").exec();
}

// create a user score product
// update score and scoreCount value
export function updateUserScoreProduct(userId: string,
  productId: string, score: number, scoreCount: number,
  avgUserScores: ProductUserScore, userScore: ProductUserScore) {
  return context.product.updateOne(
    { _id: productId },
    {
      $set: {
        score,
        scoreCount,
        avgUserScores,
        [`userScores.${userId}`]: userScore
      }
    }
  );
}

// find user score product
export function findUserScoreInProduct(userId: string, productId: string) {
  return context.product.findOne(
    { _id: productId },
    { [`userScores.${userId}`]: 1 }
  ).select('+userScores');
}

// get product score
export function getAvgProductScore(productId: string) {
  return context.product.findOne(
    { _id: productId },
    { avgUserScores: 1, score: 1, scoreCount: 1 }
  );
}

export async function addProduct(product: IProduct) {
  product.avgUserScores = {
    contentScore: 0,
    priceScore: 0,
    productScore: 0,
    supportScore: 0
  };
  product.score = 0;
  product.scoreCount = 0;
  product.userScores = new Map();
  product.createdAt = new Date();
  product.modifiedAt = new Date();

  const newProduct = new context.product(product);
  await newProduct.save();
  await newProduct.populate('category');
  return newProduct;
}

export function updateProduct(id: string, data: Partial<IProductDocument>): Promise<IProductDocument | null> {
  data.modifiedAt = new Date();
  return context.product.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  ).populate("category");
}

export function deleteProduct(id: string): Promise<IProductDocument | null> {
  return context.product.findOneAndDelete({ _id: id });
}

export function deleteProductImage(imagePath: string): Promise<boolean> {
  // فقط path نسبی مجاز
  const safePath = path.normalize(imagePath).replace(/^(\.\.(\/|\\|$))+/, '');

  const fullPath = path.join(
    process.cwd(),
    'public',
    safePath
  );

  return new Promise<boolean>((res, rej) => {
    fs.unlink(fullPath, (err) => {
      if (err) {
        rej(err);
      } else {
        res(true);
      }
    });
  });
}