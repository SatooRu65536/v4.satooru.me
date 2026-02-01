import Footer from '@/components/base/Footer';
import Header from '@/components/base/Header';
import PageLayout from '@/layouts/Page';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_theme')({
  component: ThemeLayout,
});

function ThemeLayout() {
  return (
    <>
      <Header />
      <PageLayout>
        <Outlet />
      </PageLayout>
      <Footer />
    </>
  );
}
