import { pagesTable } from '@/db/schema';
import { baseServerGetFn } from '@/functions/baseServerFn';
import { Page } from '@/types/page';
import { notFound } from '@tanstack/react-router';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const paramsSchema = z.object({
  slug: z.string(),
});

export const getPage = baseServerGetFn
  .inputValidator(paramsSchema)
  .handler(async ({ context, data }): Promise<Page> => {
    const pageRecord = await context.db.query.pagesTable.findFirst({
      where: eq(pagesTable.slug, data.slug),
    });

    if (pageRecord == undefined) throw notFound();

    const content = await context.r2.get(pageRecord.key);
    if (content == null) throw notFound();

    return {
      ...pageRecord,
      content: await content.text(),
    };
  });
