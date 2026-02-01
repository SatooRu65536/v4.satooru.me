import styles from './index.module.scss';
import Footer from '@/components/base/Footer';
import Header from '@/components/base/Header';

interface PageLayoutProps {
  children?: React.ReactNode;
  fixed?: boolean;
}

export default function PageLayout({ children, fixed }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main className={styles.main} data-fixed={fixed}>
        {children}
      </main>
      {!fixed && <Footer />}
    </>
  );
}
