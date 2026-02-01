import type { ReactElement } from 'react';
import styles from './index.module.scss';
import { Link } from '@tanstack/react-router';
import icon from '@/assets/icon.webp';

const LINKS = [
  { title: 'Home', to: '/' },
  { title: 'About', to: '/about' },
  { title: 'Posts', to: '/posts' },
  { title: 'Research', to: '/research' },
];

interface Props {
  fixed?: boolean;
}

export default function Header({ fixed }: Props): ReactElement {
  return (
    <header className={styles.header} data-fixed={fixed}>
      <Link to="/" className={styles.title_container}>
        <img alt="アイコン" className={styles.icon} src={icon} />
        <h3 className={styles.title}>佐藤さとる</h3>
      </Link>

      <nav className={styles.nav}>
        {LINKS.map((l) => (
          <Link className={styles.link} to={l.to} key={l.to}>
            {l.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
