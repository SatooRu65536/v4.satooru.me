import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  // loader: async ({ context }) => {
  //   const contents = await context.db.query.contentsTable.findMany();
  // },
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
