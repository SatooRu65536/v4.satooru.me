import styles from './index.module.scss';

// 使用可能な文字
const VALID_SLUG_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz0123456789-_';

interface PageSettingsProps {
  slug: string;
  setSlug: (slug: string) => void;
}

export default function PageSettings({ slug, setSlug }: PageSettingsProps) {
  const onSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ([...e.target.value].some((char) => !VALID_SLUG_CHARACTERS.includes(char))) return;
    setSlug(e.target.value);
  };

  return (
    <div className={styles.metadata}>
      <span className={styles.title}>slug:</span>
      <span>/</span>
      <input type="text" value={slug} onChange={onSlugChange} placeholder="slug" />
    </div>
  );
}
