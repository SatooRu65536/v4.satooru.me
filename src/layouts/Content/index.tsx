import styles from './index.module.scss';
import classNames from 'classnames';

interface ContentLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContentLayout({ children, className }: ContentLayoutProps) {
  return <div className={classNames(styles.content, className)}>{children}</div>;
}
