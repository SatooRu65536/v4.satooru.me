import { FadeIn, FadeInWithStagger } from '@/components/common/Fadein';
import { filterIconKeys } from '@/utils/icon';
import ProjectCard from './Card';
import styles from './index.module.scss';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@/types/project';
import { ofetch } from 'ofetch';
import Loading from '@/components/common/Loading';
import { env } from 'cloudflare:workers';

async function fetchProjects() {
  try {
    const url = new URL('/projects', import.meta.env.VITE_API_URL ?? env.VITE_API_URL);
    return await ofetch<Project[]>(url.toString(), { parseResponse: JSON.parse });
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function InnerProjectsSection() {
  const { data: projects, isPending } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  if (isPending) {
    return <Loading />;
  }

  return (
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
  );
}
