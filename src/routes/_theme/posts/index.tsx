import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_theme/posts/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(theme)/posts/"!</div>;
}
