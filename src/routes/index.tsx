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
import ProductsSection from './-components/sections/Products';
import { getProductPosts } from '@/functions/getProductPosts';
import { getProjects } from '@/functions/getProjects';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => {
    const [productPosts, recentPosts, projects] = await Promise.all([
      getProductPosts(),
      getRecentPosts(),
      getProjects(),
    ]);
    return { productPosts, recentPosts, projects };
  },
});

function RouteComponent() {
  const { productPosts, recentPosts, projects } = Route.useLoaderData();

  return (
    <PageLayout>
      <AboutSection />
      <LinksSection />
      <SkillsSection />
      <ProjectsSection projects={projects} />
      <WorksSection />
      <ExperiencesSection />
      <PresentationsSection />
      <AwardsSection />
      <RecentPostsSection posts={recentPosts} />
      <ProductsSection products={productPosts} />
    </PageLayout>
  );
}
