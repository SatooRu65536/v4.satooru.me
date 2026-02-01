import Icon, { ICON_KEYS, ICON_MAP, IconKey } from '@/components/common/Icon';
import { EditPostSchema } from '../../../../schemas/post';
import styles from './index.module.scss';
import MultipleSelect from '@/components/common/MultiSelect';
import Select from '@/components/common/Select';
import { CATEGORIES, Category } from '@/consts/categories';
import { ImageIcon } from 'lucide-react';
import Dialog from '@/components/common/Dialog';
import { ImageDropZone } from '@/components/common/ImageDropZone';

interface PostMetadataProps {
  post: EditPostSchema;
  setTitle: (title: string) => void;
  setCategory: (category: Category | null) => void;
  setIcons: (icons: IconKey[]) => void;
  setThumbnail: (thumbnail: string) => void;
}

export default function PostMetadata({ post, setTitle, setCategory, setIcons, setThumbnail }: PostMetadataProps) {
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className={styles.metadata}>
      <div className={styles.title_container}>
        <input type="text" className={styles.title} value={post.title} onChange={onTitleChange} placeholder="Title" />
      </div>

      <div className={styles.select_container}>
        <Select<Category>
          className={styles.category_select}
          options={CATEGORIES.map((c) => ({ value: c, label: c }))}
          onChange={setCategory}
          selectedValues={post.category}
          placeholder="Category"
        />

        {post.category === 'product' && (
          <>
            <MultipleSelect<IconKey>
              className={styles.icon_select}
              options={ICON_KEYS.map((icon) => ({ value: icon, label: ICON_MAP[icon].name }))}
              selectedValues={post.icons}
              onChange={setIcons}
              render={(value) => (
                <div className={styles.select_item}>
                  <Icon iconKey={value} /> {ICON_MAP[value].name}
                </div>
              )}
              placeholder="icons"
            />

            {post.icons.map((iconKey) => (
              <Icon iconKey={iconKey} key={iconKey} />
            ))}
          </>
        )}
      </div>

      <div className={styles.thumbnail_container}>
        <label htmlFor="thumbnail">
          <Dialog trigger={<ImageIcon />} title="Thumbnail">
            <ImageDropZone onChange={setThumbnail} value={post.thumbnail} />
            <input
              className={styles.thumbnail_url}
              type="url"
              id="thumbnail"
              value={post.thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="thumbnail url"
            />
          </Dialog>
        </label>
      </div>
    </div>
  );
}
