import { context } from "@app/db";
import { ICategoryDocument } from "@app/models";


export function getAllCategories() {
  return context.category.find({}).exec();
}

export function updateCategory(id: string, data: Partial<ICategoryDocument>): Promise<ICategoryDocument | null> {
  return context.category.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
}

export function createCategory(data: ICategoryDocument): Promise<ICategoryDocument> {
  const newCategory = new context.category(data);
  return newCategory.save();
}

export function deleteCategory(id: string): Promise<ICategoryDocument | null> {
  return context.category.findOneAndDelete({ _id: id });
}