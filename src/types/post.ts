import { PostTable } from './db';

export interface Post extends PostTable {
  content: string;
}
