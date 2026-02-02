import { v4 } from 'uuid';

export function getPostKey(): string {
  const prefix = 'posts/';
  const uuid = v4();

  return `${prefix}${uuid}.md`;
}

export function getImageKey(filename: string): string {
  const prefix = 'images/';
  const uuid = v4();
  const ext = filename.split('.').pop();

  return `${prefix}${uuid}.${ext}`;
}

export function getPageKey(slug: string): string {
  const prefix = 'pages/';

  return `${prefix}${slug}.md`;
}
