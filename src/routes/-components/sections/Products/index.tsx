import type { ReactElement } from 'react';
import SectionLayout from '@/layouts/Section';
import ProductCard from './Card';
import styles from './index.module.scss';
import { ProductPost } from '@/types/post';

interface ProductsSectionProps {
  products: ProductPost[];
}

export default function ProductsSection({ products }: ProductsSectionProps): ReactElement {
  return (
    <SectionLayout title="Products" fadein={false}>
      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </SectionLayout>
  );
}
