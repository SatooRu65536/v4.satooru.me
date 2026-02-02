import { v4 } from 'uuid';

export function getImageUrl(key: string): string {
  return `https://assets.satooru.me/${key}`;
}

export function getImageKey(filename: string): string {
  const prefix = 'images/';
  const uuid = v4();
  const ext = filename.split('.').pop();

  return `${prefix}${uuid}.${ext}`;
}
