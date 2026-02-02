import type { ReactElement } from 'react';
import { FadeIn } from '@/components/common/Fadein';
import ListItem from '@/components/common/ListItem';
import { AWARD } from '@/const/awards';
import SectionLayout from '@/layouts/Section';
import styles from './index.module.scss';

export default function AwardsSection(): ReactElement {
  return (
    <SectionLayout center title="Awards">
      <ul className={styles.award}>
        {AWARD.map((award, i) => (
          <FadeIn direction="left" key={i}>
            <ListItem {...award} />
          </FadeIn>
        ))}
      </ul>
    </SectionLayout>
  );
}
