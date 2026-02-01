export const CATEGORIES = ['private', 'kajilab', 'product', 'report'] as const;
export type Category = (typeof CATEGORIES)[number];
