import type { ReactElement } from 'react';
import SectionLayout from '@/layouts/Section';
import PostCard from './Card';
import styles from './index.module.scss';
import { Post } from '@/types/post';

interface RecentPostsSectionProps {
  posts: Post[];
}

export default function RecentPostsSection({ posts }: RecentPostsSectionProps): ReactElement {
  return (
    <SectionLayout title="Recent Posts" fadein={false}>
      <div className={styles.recent_posts}>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </SectionLayout>
  );
}
