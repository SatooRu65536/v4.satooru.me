import PageLayout from '@/layouts/Page';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import PostList from './-components/PostList';
import { getPosts } from '@/functions/getPosts';
import { CATEGORIES } from '@/consts/categories';
import { useKeyboardShortcut } from '@/hools/useKeyboardShortcut';

const searchSchema = z.object({
  page: z.coerce.number().min(1).default(1),
});

export const Route = createFileRoute('/posts/')({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ deps }) => await getPosts({ data: { page: deps.page } }),
  component: RouteComponent,
});

function RouteComponent() {
  const { page } = Route.useSearch();
  const { posts, count } = Route.useLoaderData();
  const navigate = useNavigate();

  useKeyboardShortcut({
    onNew: () => void navigate({ to: '/post/new' }),
  });

  return (
    <PageLayout>
      <PostList page={page} posts={posts} categories={CATEGORIES} count={count} />
    </PageLayout>
  );
}
