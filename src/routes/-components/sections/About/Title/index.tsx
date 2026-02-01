import type { ReactElement } from 'react';
import styles from './index.module.scss';
import icon from '@/assets/icon.webp';

export default function Title(): ReactElement {
  return (
    <div className={styles.title}>
      <img alt="アイコン" className={styles.icon} src={icon} />
      <h3 className={styles.title}>佐藤さとる</h3>
    </div>
  );
}
