import type { HTMLProps, ReactElement } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

type Props = HTMLProps<HTMLDivElement>;

export default function Loading({ className, ...props }: Props): ReactElement {
  return (
    <div {...props} className={classNames(styles.loading, className)}>
      <div />
    </div>
  );
}
