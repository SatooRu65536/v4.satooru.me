import { baseServerPostFn } from '@/lib/baseServerFn';
import { getImageUrl, getKey } from '@/utils/img';

export const uploadImageServer = baseServerPostFn
  .inputValidator((data: { content: Uint8Array; filename: string }) => data)
  .handler(async ({ context, data }) => {
    const key = getKey(data.filename);

    const res = await context.r2.put(key, data.content);
    if (res == null) throw new Error('Image upload failed');

    const url = getImageUrl(key);
    return { url };
  });

export type UploadImageFn = typeof uploadImageServer;
