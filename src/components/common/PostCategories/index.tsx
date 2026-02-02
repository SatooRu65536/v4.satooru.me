import type { ReactElement } from 'react';
import styles from './index.module.scss';
import { capitalize } from 'remeda';
import { Category } from '@/consts/categories';
import { Link } from '@tanstack/react-router';

interface Props {
  categories: readonly Category[];
  current?: Category;
}

export default function PostCategories({ categories, current }: Props): ReactElement {
  return (
    <div className={styles.container}>
      <Link className={styles.link} data-selected={current === undefined} to="/posts">
        {capitalize('All')}
      </Link>

      {categories.map((category) => (
        <Link
          className={styles.link}
          data-selected={category === current}
          to="/posts/$category"
          params={{ category }}
          key={category}
        >
          {capitalize(category)}
        </Link>
      ))}
    </div>
  );
}
