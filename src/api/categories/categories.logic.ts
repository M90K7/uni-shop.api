import { context } from "@app/db";
import { ICategoryDocument } from "@app/models";


export function getAllCategories() {
  return context.category.find({
    isAvailable: true
  }).sort({order: 1}).exec();
}

export function getAdminAllCategories() {
  return context.category.find({}).sort({order: 1}).exec();
}

export function updateCategory(id: string, data: Partial<ICategoryDocument>): Promise<ICategoryDocument | null> {
  data.modifiedAt = new Date();

  return context.category.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
}

export function createCategory(data: ICategoryDocument): Promise<ICategoryDocument> {
  data.createdAt = new Date();
  data.modifiedAt = new Date();

  const newCategory = new context.category(data);
  return newCategory.save();
}

export function deleteCategory(id: string): Promise<ICategoryDocument | null> {
  return context.category.findOneAndDelete({ _id: id });
}