import type { ReactElement } from 'react';
import Icon from '@/components/common/Icon';
import CardLayout from '@/layouts/Card';
import dayjs from 'dayjs';
import styles from './index.module.scss';
import { ProductPost } from '@/types/post';

interface Props {
  product: ProductPost;
}

export default function ProductCard({ product }: Props): ReactElement {
  return (
    <CardLayout className={styles.card} to="/post/$postId" params={{ postId: product.id }}>
      <div className={styles.left}>
        <h3 className={styles.title}>{product.title}</h3>
        <h4 className={styles.tag}>{product.data.tag}</h4>
        <div className={styles.tech_wrapper}>
          <div>
            {product.data.icons.map((icon) => (
              <Icon iconKey={icon} key={icon} />
            ))}
          </div>
        </div>
        <p className={styles.date}>{dayjs(product.createdAt).format('YYYY/MM/DD')}</p>
      </div>

      <div className={styles.right}>
        <img alt="Thumbnail" className={styles.thumbnail} src={product.thumbnail} />
      </div>
    </CardLayout>
  );
}
