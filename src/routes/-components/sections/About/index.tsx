import type { ReactElement } from 'react';
import { FadeIn } from '@/components/common/Fadein';
import { ABOUT } from '@/const/about';
import SectionLayout from '@/layouts/Section';
import Title from './Title/index';
// import styles from './index.module.scss';
// import { Link } from '@tanstack/react-router';

export default function AboutSection(): ReactElement {
  return (
    <SectionLayout fadein={false} title={<Title />} underline>
      <FadeIn direction="left">
        <p>{ABOUT}</p>

        {/* <div className={styles.detail}>
          <Link to="/about">乱雑な詳細</Link>
        </div> */}
      </FadeIn>
    </SectionLayout>
  );
}
