import { v4 } from 'uuid';

export function getPostKey(): string {
  const prefix = import.meta.env.DEV ? 'dev/posts/' : 'posts/';
  const uuid = v4();

  return `${prefix}${uuid}.md`;
}
