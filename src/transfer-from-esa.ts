import { join } from 'path';
import fs from 'fs';
import matter, { type GrayMatterFile } from 'gray-matter';
import { z } from 'zod';

const CONTENTS_PATH = './zzz-contents';

type RawContent = GrayMatterFile<string>;

const _contents: RawContent[] = _getContents();

function _getFilePaths(articlesDir: string): string[] {
  const files = fs.readdirSync(articlesDir);
  const filteredFiles = files.filter((f) => !f.startsWith('.'));
  return filteredFiles.map((f) => join(articlesDir, f));
}

function _readFile(filePath: string): RawContent {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return matter(fileContent);
}

function _getContents(): RawContent[] {
  const contentsDir = join(process.cwd(), CONTENTS_PATH);
  return _getFilePaths(contentsDir).map((filePath) => _readFile(filePath));
}

interface GetContentOptions {
  category?: string;
  limit?: number;
}

export function getContents<T extends z.Schema = typeof zContentSchema>(
  { category, limit }: GetContentOptions,
  zSchema?: T,
): z.infer<T>[] {
  const contents: z.infer<T>[] = _contents
    .map((content) => parseContent(content, zSchema ?? zContentSchema))
    .filter((c) => c !== undefined)
    .sort((a, b) => (a?.data.updated_at > b?.data.updated_at ? -1 : 1));

  if (category === undefined) return contents.slice(0, limit);
  return contents.filter((content) => content.data.category === category).slice(0, limit);
}

export function parseContent<T extends z.Schema>(content: RawContent, schema: T): z.infer<T> | undefined {
  const res = schema.safeParse(content);
  if (res.success) return res.data;

  console.error(res.error.errors);
  throw new Error('Failed to parse content');
}

// --------------------------

const POST_DEFAULT_THUMBNAIL = '/penguin.webp';
const FIRST_IMAGE_REGEX = /\s*(<img.*?src=['"](.*)['"].*>|!\[.*\]\((.*)\))/;

export const zContentDataSchema = _esaSchema({
  date: z.coerce.date().optional(),
});
export type ContentData = z.infer<typeof zContentDataSchema>;

export const zProductDataSchema = _esaSchema({
  date: z.coerce.date().optional(),
  type: z.string().default('その他'),
});
export type ProductData = z.infer<typeof zProductDataSchema>;

export const zContentSchema = _contentSchem(zContentDataSchema);
export type Content = z.infer<typeof zContentSchema>;

export const zProductSchema = _contentSchem(zProductDataSchema).transform(({ content, ...d }) => {
  const techIcons = filterIconKeys(getIcons(content));
  return { ...d, content, techIcons };
});
export type Product = z.infer<typeof zProductSchema>;

function _esaSchema<T extends Record<string, z.Schema>>(tagsSchema: T) {
  return z
    .object({
      title: z.string(),
      category: z.preprocess(
        (category) => {
          if (typeof category !== 'string') throw new Error('category must be a string');

          const [categoryName, ...path] = category.split('/');
          return { category: categoryName, path: path.join('/') };
        },
        z.object({ category: z.string(), path: z.string() }),
      ),
      tags: z.preprocess((tags) => {
        if (tags == null) return {};
        if (typeof tags !== 'string') throw new Error('tags must be a string');

        const entries = tags.split(',').map((pair) => {
          const pairs = pair.split(':');
          const key = pairs.at(0)?.trim();
          const value = pairs.at(1)?.trim();
          if (!key || !value) return null;
          return [key, value];
        });

        const noneNullEntries = entries.filter((entry): entry is [string, string] => entry !== null);
        return z.object<T>(tagsSchema).parse(Object.fromEntries(noneNullEntries));
      }, z.object(tagsSchema)),
      created_at: z.coerce.date(),
      updated_at: z.coerce.date(),
      published: z.boolean(),
      number: z.number(),
    })
    .transform(({ category, tags, ...esa }) => {
      const date: Date = 'date' in tags ? (tags.date as Date) : esa.updated_at;
      const link = `/posts/${category.category}/${esa.number}`;
      return { ...esa, ...category, updated_at: date, tags, link };
    });
}

function _contentSchem<T extends z.Schema>(dataSchema: T) {
  return z
    .object({
      data: dataSchema,
      content: z.string(),
      excerpt: z.string().optional(),
      matter: z.string(),
      language: z.string(),
    })
    .transform(({ content, ...d }) => {
      const thumbnail = _getThumbnail(content);
      return { ...d, thumbnail, content };
    });
}

function _getThumbnail(content: string): string {
  const match = content.match(FIRST_IMAGE_REGEX);
  return (match && (match[2] || match[3])) ?? POST_DEFAULT_THUMBNAIL;
}

function getIcons(content: string): IconKey[] {
  const match = content.match(/<!-- icons: (.*) -->/);
  return (
    match
      ?.at(1)
      ?.split(',')
      .map((icon) => icon.trim() as IconKey) ?? []
  );
}

export function getPostKey(): string {
  const prefix = import.meta.env.DEV ? 'dev/posts/' : '/posts/';
  const uuid = v4();

  return `${prefix}${uuid}.md`;
}

// ---------------------------

import { v4 } from 'uuid';
import { Category } from '@/consts/categories';
import { Post } from '@/types/post';
import { IconKey } from '@/components/common/Icon';

async function run() {
  const contents = await getContents({});

  const postMetadata: Omit<Post, 'id'>[] = [];
  for (const content of contents) {
    console.log(`${content.data.number}: ${content.data.title}`);

    const key = getPostKey();
    const c = content.content.replace(/\/img\/\d+\/([a-f0-9\-]+)\.(png|jpg|jpeg|webp)/g, (_match, p1, p2) => {
      return `https://assets.satooru.me/images/${p1}.${p2}`;
    });
    // / で分割
    const p = content.thumbnail.split('/');
    const t = `https://assets.satooru.me/images/${p.at(-1)}`;
    // zzz-output に保存
    fs.writeFileSync(`./zzz-output/${key.split('/').pop()}`, c);

    postMetadata.push({
      title: content.data.title,
      key: key,
      category: content.data.category as Category,
      icons: getIcons(content.content),
      draft: !content.data.published,
      thumbnail: t,
      content: c,
      createdAt: content.data.created_at,
      updatedAt: content.data.updated_at,
      deleted: false,
    });
  }

  fs.writeFileSync('./zzz-output/_metadata.json', JSON.stringify(postMetadata, null, 2));
}

void run().then(() => {
  console.log('Done');
});
