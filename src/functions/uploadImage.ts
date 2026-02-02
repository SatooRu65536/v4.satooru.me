import { baseServerPostFn } from '@/functions/baseServerFn';
import { getImageUrl } from '@/utils/img';
import { getImageKey } from '@/utils/r2key';

export const uploadImageServer = baseServerPostFn
  .inputValidator((data: { content: Uint8Array; filename: string }) => data)
  .handler(async ({ context, data }) => {
    const key = getImageKey(data.filename);

    const res = await context.r2.put(key, data.content);
    if (res == null) throw new Error('Image upload failed');

    const url = getImageUrl(key);
    return { url };
  });

export type UploadImageFn = typeof uploadImageServer;
