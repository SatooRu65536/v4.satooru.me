import styles from './index.module.scss';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { baseServerPostFn } from '@/lib/baseServerFn';
import { getImageUrl, getKey } from '@/utils/img';
import { highlight, languages } from 'prismjs';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import { remark } from 'remark';
import 'prismjs/themes/prism.min.css';
import '@/styles/md-styles.scss';

const remarkProcessor = remark()
  .use(remarkBreaks)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStringify);

// 対応言語のマッピング
const langs = [
  ['ts', 'js'],
  ['tsx', 'js'],
  ['jsx', 'js'],
  ['scss', 'css'],
] as const;
const existLangs: [string, string][] = Object.keys(languages).map((key) => [key, key]);
const langMap = new Map<string, string>([...langs, ...existLangs]);

const uploadImageServer = baseServerPostFn
  .inputValidator((data: { content: Uint8Array; filename: string }) => data)
  .handler(async ({ context, data }) => {
    const key = getKey(data.filename);

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
  const renderHTML = async (text: string) => {
    const processed = await remarkProcessor.process(text);

    const rawHtml = processed
      .toString()
      .replace(/<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g, (_, lang: string, code: string) => {
        const highlighted = highlight(
          code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'),
          languages[langMap.get(lang) || 'plaintext'],
          lang,
        );
        return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`;
      });

    return rawHtml;
  };

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
      className={`${styles.post_edit} md-content`}
      value={markdown}
      renderHTML={renderHTML}
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
