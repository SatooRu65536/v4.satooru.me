import type { ReactElement } from 'react';
import styles from './index.module.scss';
import { Link, LinkProps } from '@tanstack/react-router';

interface CardLayoutProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
}

export default function CardLayout({ children, className, to, ...rest }: CardLayoutProps): ReactElement {
  return (
    <article className={`${styles.card} ${className}`} {...rest} data-haslink={to !== undefined}>
      {to !== undefined && <Link className={styles.link} to={to} {...rest} />}
      {children}
    </article>
  );
}
