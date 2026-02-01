import type { ReactElement } from 'react';
import styles from './index.module.scss';
import { Link } from '@tanstack/react-router';
import notfoundSvg from './assets/404.svg';

export default function NotFound(): ReactElement {
  return (
    <Link className={styles.notfound} to="/">
      <div className={styles.img_wrapper}>
        <img alt="404" className={styles.penguin} src={notfoundSvg} />
      </div>
      <div className={styles.line_container} />
    </Link>
  );
}
