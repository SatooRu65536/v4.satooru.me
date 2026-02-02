import PageLayout from '@/layouts/Page';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import PostList from '../-components/PostList';
import { getPosts } from '@/functions/getPosts';
import { CATEGORIES } from '@/consts/categories';

const searchSchema = z.object({
  page: z.coerce.number().min(1).default(1),
});

const paramsSchema = z.object({
  category: z.enum(CATEGORIES),
});

export const Route = createFileRoute('/posts/$category/')({
  validateSearch: searchSchema,
  params: paramsSchema,
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ deps, params }) => await getPosts({ data: { page: deps.page, category: params.category } }),
  component: RouteComponent,
});

function RouteComponent() {
  const { page } = Route.useSearch();
  const { category } = Route.useParams();
  const { posts, count } = Route.useLoaderData();

  return (
    <PageLayout>
      <PostList page={page} posts={posts} categories={CATEGORIES} count={count} category={category} />
    </PageLayout>
  );
}
