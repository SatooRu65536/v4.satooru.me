import { v4 } from 'uuid';

export function getPostKey(): string {
  const prefix = 'posts/';
  const uuid = v4();

  return `${prefix}${uuid}.md`;
}
