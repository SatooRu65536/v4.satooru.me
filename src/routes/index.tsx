import { createFileRoute } from '@tanstack/react-router';
import AboutSection from './-components/sections/About';
import LinksSection from './-components/sections/Links';
import SkillsSection from './-components/sections/Skills';
import ProjectsSection from './-components/sections/Projects';
import WorksSection from './-components/sections/Works';
import ExperiencesSection from './-components/sections/Experiences';
import PresentationsSection from './-components/sections/Presentations';
import AwardsSection from './-components/sections/Awards';
import PageLayout from '@/layouts/Page';
import RecentPostsSection from './-components/sections/Posts';
import { getRecentPosts } from '@/functions/getRecentPosts';
// import ProductsSection from './-components/sections/Products';

import meta from '../../zzz-output/_metadata.json';
import { Category } from '@/consts/categories';
import { IconKey } from '@/components/common/Icon';
import { baseServerGetFn } from '@/functions/baseServerFn';
import { postsTable } from '@/db/schema';

const serverFn = baseServerGetFn.handler(async ({ context }) => {
  // await context.db.delete(postsTable);
  for (const p of meta) {
    console.log(p.title);
    await context.db.insert(postsTable).values({
      key: p.key,
      title: p.title,
      category: p.category as Category,
      thumbnail: p.thumbnail,
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt),
      deleted: p.deleted,
      draft: p.draft,
      icons: p.icons as IconKey[],
    });
  }
});

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => await getRecentPosts(),
});

function RouteComponent() {
  const recentPosts = Route.useLoaderData();

  const onClick = () => {
    void serverFn();
  };

  return (
    <PageLayout>
      <div>
        <button onClick={onClick}>Reset Posts</button>
      </div>
      <AboutSection />
      <LinksSection />
      <SkillsSection />
      <ProjectsSection />
      <WorksSection />
      <ExperiencesSection />
      <PresentationsSection />
      <AwardsSection />
      <RecentPostsSection posts={recentPosts} />
      {/* <ProductsSection /> */}
    </PageLayout>
  );
}
