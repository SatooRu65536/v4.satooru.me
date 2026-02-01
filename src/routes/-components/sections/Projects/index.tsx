import SectionLayout from '@/layouts/Section';
import { InnerProjectsSection } from './Inner';

export default function ProjectsSection() {
  return (
    <SectionLayout title="Active Projects">
      <InnerProjectsSection />
    </SectionLayout>
  );
}
