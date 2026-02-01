import { z } from 'zod';

export const postIdSchema = z.number().or(z.coerce.number()).brand<'PostId'>();
export type PostId = z.infer<typeof postIdSchema>;

export const postTitleSchema = z.string().min(1).max(100).brand<'PostTitle'>();
export type PostTitle = z.infer<typeof postTitleSchema>;

export const postKeySchema = z.string().brand<'PostKey'>();
export type PostKey = z.infer<typeof postKeySchema>;
