import Header from '@/components/Header';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_theme')({
  component: ThemeLayout,
});

function ThemeLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
