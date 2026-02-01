import { v4 } from 'uuid';

export function getImageUrl(key: string): string {
  return `https://img.satooru.me/${key}`;
}

export function getKey(filename: string): string {
  const prefix = import.meta.env.DEV ? 'dev/images/' : 'prod/images/';
  const uuid = v4();
  const ext = filename.split('.').pop();

  return `${prefix}${uuid}.${ext}`;
}
