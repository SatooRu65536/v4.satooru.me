import SectionLayout from '@/layouts/Section';
import { FadeIn, FadeInWithStagger } from '@/components/common/Fadein';
import { filterIconKeys } from '@/utils/icon';
import ProjectCard from './Card';
import styles from './index.module.scss';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/common/Loading';
import { getProjects } from '@/functions/getProjects';

export default function ProjectsSection() {
  const { data: projects, isPending } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <SectionLayout title="Active Projects">
      <FadeInWithStagger className={styles.fade_wrapper}>
        <p>GitHub API から取得しています</p>

        <div className={styles.projects}>
          {projects?.map((project) => (
            <FadeIn className={styles.fade} key={project.name}>
              <ProjectCard
                description={project.summary}
                repository={project.repository}
                site={project.site}
                techs={filterIconKeys(project.tags)}
                title={project.name}
              />
            </FadeIn>
          ))}
        </div>

        {projects?.length === 0 && (
          <FadeIn className={styles.none}>
            <p>なし</p>
          </FadeIn>
        )}
      </FadeInWithStagger>
    </SectionLayout>
  );
}
