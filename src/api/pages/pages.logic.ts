import { context } from "@app/db";
import { IPageDocument } from "@app/models";

export function getAllPages() {
  return context.page.find({}).exec();
}

export async function getPage(name: string) {
  let page: IPageDocument | null = await context.page.findOne({ name })
    .select({ mainSectionTitle: 1, mainSectionProducts: 1 })
    .populate({
      path: 'mainSectionProducts'
    })
    .populate({
      path: 'rightSectionProducts'
    })
    .populate({
      path: 'leftSectionProducts'
    })
    .populate({
      path: 'comments'
    })
    .exec();

  if (!page) {
    page = await createPage({ name });
  }

  return page;
}

export function updatePage(id: string, data: Partial<IPageDocument>): Promise<IPageDocument | null> {
  data.modifiedAt = new Date();

  return context.page.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
}

export function createPage(data: Partial<IPageDocument>): Promise<IPageDocument> {
  data.createdAt = new Date();
  data.modifiedAt = new Date();

  const newPage = new context.page(data);
  return newPage.save();
}

export function deletePage(id: string): Promise<IPageDocument | null> {
  return context.page.findOneAndDelete({ _id: id });
}

