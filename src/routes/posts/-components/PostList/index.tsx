import styles from './index.module.scss';
import { AllPostSchema } from '@/schemas/post';
import { Category } from '@/consts/categories';
import PostCategories from '@/components/common/PostCategories';
import ListPostCard from './Card';
import PageNation, { PageToFn } from '@/components/common/Pagenation';

interface Props {
  page: number;
  count: number;
  posts: AllPostSchema[];
  category?: Category;
  categories: readonly Category[];
}

export default function PostList({ page, posts, count, category, categories }: Props) {
  const pageTo: PageToFn = (page: number) => {
    if (category == undefined) return { to: '/posts', search: { page }, params: {} };
    else return { to: '/posts/$category', params: { category }, search: { page } };
  };

  return (
    <div className={styles.container}>
      <section className={styles.categories_wrapper}>
        <PostCategories categories={categories} current={category} />
      </section>

      <section className={styles.articles_wrapper}>
        <div className={styles.articles}>
          {posts.length === 0 ? (
            <p>記事はありません</p>
          ) : (
            posts.map((post) => <ListPostCard post={post} key={post.id} />)
          )}
        </div>
      </section>

      <section className={styles.pagenation}>
        <PageNation page={page} pageTo={pageTo} count={count} />
      </section>
    </div>
  );
}
