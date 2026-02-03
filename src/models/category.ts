
export interface ICategory {
  persianTitle: string;
  englishTitle?: string;
  imagePath?: string;
  url: string;
}

export interface ICategoryDocument extends ICategory, Document { }