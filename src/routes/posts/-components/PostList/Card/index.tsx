import type { ReactElement } from 'react';
import CardLayout from '@/layouts/Card';
import dayjs from 'dayjs';
import styles from './index.module.scss';
import { PostTable } from '@/types/db';

interface Props {
  post: PostTable;
}

export default function ListPostCard({ post }: Props): ReactElement {
  return (
    <CardLayout className={styles.card} to="/post/$postId" params={{ postId: post.id }}>
      <h3 className={styles.title}>{post.title}</h3>

      <div className={styles.left}>
        <div className={styles.content}>
          <p>{post.previewText}</p>
        </div>
        <p className={styles.date}>{dayjs(post.createdAt).format('YYYY/MM/DD')}</p>
      </div>

      <div className={styles.right}>
        <img alt="Thumbnail" className={styles.thumbnail} src={post.thumbnail} />
      </div>
    </CardLayout>
  );
}
