import Footer from '@/components/base/Footer';
import Header from '@/components/base/Header';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_theme')({
  component: ThemeLayout,
});

function ThemeLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
