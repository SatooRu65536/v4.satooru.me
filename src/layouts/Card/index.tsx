import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';
import styles from './index.module.scss';
import { Link } from '@tanstack/react-router';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  link?: string;
}

export default function CardLayout(props: Props): ReactElement {
  const { children, className, link, ...rest } = props;

  return (
    <article className={`${styles.card} ${className}`} {...rest} data-haslink={link !== undefined}>
      {link !== undefined && <Link className={styles.link} to={link} />}
      {children}
    </article>
  );
}
