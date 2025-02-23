export type BookStructure = {
  title: string;
  id: number;
  summary: string;
  author: string;
  image: string;
  publishedDate: string;
  category: string;
  specificType: string;
}


export interface Author {
  id: number;
  name: string;
  text: string;
  image: string;
}