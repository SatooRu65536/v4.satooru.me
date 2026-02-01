import { baseServerFn } from '@/lib/baseServerFn';
import { createFileRoute } from '@tanstack/react-router';

const getContents = baseServerFn.handler(async ({ context }) => {
  const contents = await context.db.query.contentsTable.findMany();
  return contents;
});

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: () => getContents(),
});

function RouteComponent() {
  const contents = Route.useLoaderData();
  console.log(contents);

  return <div>Hello "/"!</div>;
}
