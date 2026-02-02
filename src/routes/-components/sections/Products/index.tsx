import type { ReactElement } from 'react';
import SectionLayout from '@/layouts/Section';
import ProductCard from './Card';
import styles from './index.module.scss';
import { PostTable } from '@/types/db';

interface ProductsSectionProps {
  posts: PostTable[];
}

export default function ProductsSection({ posts }: ProductsSectionProps): ReactElement {
  return (
    <SectionLayout title="Products" fadein={false}>
      <div className={styles.products}>
        {posts.map((post) => (
          <ProductCard post={post} key={post.id} />
        ))}
      </div>
    </SectionLayout>
  );
}
