import { useMemo, type ReactElement } from 'react';
import { PER_PAGE } from '@/const/setting';
import styles from './index.module.scss';
import { pipe } from 'remeda';
import { Link, LinkProps } from '@tanstack/react-router';

export type PageToReturn = { to: LinkProps['to']; search: LinkProps['search']; params: LinkProps['params'] };
export type PageToFn = (page: number) => PageToReturn;

interface Props {
  count: number;
  page: number;
  pageTo: PageToFn;
}

const DISPLAY_PAGE_RANGE = 2;

export default function PageNation({ count, page, pageTo }: Props): ReactElement {
  const pageNum = Math.ceil(count / PER_PAGE);

  const displayPageNums = useMemo(
    () =>
      pipe(null, () => {
        const min = page - DISPLAY_PAGE_RANGE < 1 ? 1 : page - DISPLAY_PAGE_RANGE;
        const max = page + DISPLAY_PAGE_RANGE > pageNum ? pageNum : page + DISPLAY_PAGE_RANGE;
        return Array.from({ length: max - min + 1 }, (_, i) => min + i);
      }),
    [page, pageNum],
  );

  return (
    <div className={styles.pagenation}>
      {displayPageNums.at(0)! > 1 && (
        <Link className={styles.page_link} data-current={page === 1} {...pageTo(1)}>
          1
        </Link>
      )}
      {displayPageNums.at(0)! > 2 && <div className={styles.leader}>•••</div>}

      {displayPageNums.map((p) => (
        <Link className={styles.page_link} data-current={page === p} {...pageTo(p)} key={p}>
          {p}
        </Link>
      ))}

      {displayPageNums.at(-1)! < pageNum - 1 && <div className={styles.leader}>•••</div>}

      {displayPageNums.at(-1)! < pageNum && (
        <Link className={styles.page_link} data-current={page === pageNum} {...pageTo(pageNum)}>
          {pageNum}
        </Link>
      )}
    </div>
  );
}
