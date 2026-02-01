import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  // loader: async ({ context }) => {
  //   const contents = await context.db.query.contentsTable.findMany();
  //   const file = await context.r2.get('');
  // },
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
