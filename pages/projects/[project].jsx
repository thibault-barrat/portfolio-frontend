import Image from 'next/image';
import CustomMarkdown from '../../components/CustomMarkdown/CustomMarkdown';
import Layout from '../../components/Layout';
import { fetchAPI } from '../../utils/api';
import styles from '../../styles/Project.module.scss';

export default function Project({ project, global }) {
  return (
    <Layout global={global} whiteNav>
      <div className={styles['title-container']}>
        <Image
          className={styles.image}
          src={project.image.url}
          alt={project.image.alternativeText || ''}
          layout="fill"
          objectFit="cover"
        />
        <div className="container">
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.description}>{project.description}</p>
        </div>
      </div>
      <CustomMarkdown className={`container ${styles.content}`} containerClassName={styles['content-image']}>
        {project.content}
      </CustomMarkdown>
      {(project.github || project.lien) && (
        <div className={`container ${styles['links-container']} ${styles.content}`}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le code
            </a>
          )}
          {project.lien && (
            <a
              href={project.lien}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visiter le site
            </a>
          )}
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.project;
  const [project, global] = await Promise.all([
    fetchAPI(`/projects?slug=${slug}`),
    fetchAPI('/global'),
  ]);

  // Fetch to projects with slug parameter returns an array of one project
  // so we need to get the first element of the array
  return {
    props: {
      project: project[0],
      global,
    },
  };
}

export async function getStaticPaths() {
  const projects = await fetchAPI('/projects');

  const paths = projects.map((project) => ({
    params: {
      project: project.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
