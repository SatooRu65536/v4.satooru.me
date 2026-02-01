import { marked } from 'marked';
import styles from './index.module.scss';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { baseServerFn } from '@/lib/baseServerFn';
import { v4 } from 'uuid';
import { getImageUrl } from '@/utils/img';

const uploadImageServer = baseServerFn('POST')
  .inputValidator((data: { content: Uint8Array; filename: string }) => data)
  .handler(async ({ context, data }) => {
    const uuid = v4();
    const ext = data.filename.split('.').pop();
    const key = `images/${uuid}.${ext}`;

    const res = await context.r2.put(key, data.content);
    if (res == null) throw new Error('Image upload failed');

    const url = getImageUrl(key);
    return { url };
  });

interface PostEditPageProps {
  markdown: string;
  onEdit: (content: string) => void;
}

export default function PostEditor({ markdown, onEdit }: PostEditPageProps) {
  const uploadImage = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const res = await uploadImageServer({
      data: { content: uint8Array, filename: file.name },
    });

    return res.url;
  };

  return (
    <MdEditor
      className={styles.post_edit}
      value={markdown}
      renderHTML={(text) => marked(text)}
      onChange={({ text }) => onEdit(text)}
      onImageUpload={uploadImage}
      config={{
        view: {
          menu: true,
          md: true,
          html: true,
          hideMenu: true,
          fullScreen: false,
        },
        syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
        imageAccept: '.jpg,.png,.pdf',
      }}
    />
  );
}
