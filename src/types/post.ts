import { ProductAdditionalData } from '@/schemas/post';
import { PostTable } from './db';

export interface Post extends PostTable {
  content: string;
}

export interface ProductPost extends PostTable {
  data: ProductAdditionalData;
}
