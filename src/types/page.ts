import { PageTable } from './db';

export interface Page extends PageTable {
  content: string;
}
