import type { ReactElement } from 'react';
import Icon from '@/components/common/Icon';
import CardLayout from '@/layouts/Card';
import dayjs from 'dayjs';
import styles from './index.module.scss';
import { PostTable } from '@/types/db';

interface Props {
  post: PostTable;
}

export default function ProductCard({ post }: Props): ReactElement {
  return (
    <CardLayout className={styles.card} to="/post/$postId" params={{ postId: post.id }}>
      <div className={styles.left}>
        <h3 className={styles.title}>{post.title}</h3>
        {/* <h4 className={styles.tag}>{post.tags?.type}</h4> */}
        <div className={styles.tech_wrapper}>
          <div>
            {post.icons.map((icon) => (
              <Icon iconKey={icon} key={icon} />
            ))}
          </div>
        </div>
        <p className={styles.date}>{dayjs(post.createdAt).format('YYYY/MM/DD')}</p>
      </div>

      <div className={styles.right}>
        <img alt="Thumbnail" className={styles.thumbnail} src={post.thumbnail} />
      </div>
    </CardLayout>
  );
}
