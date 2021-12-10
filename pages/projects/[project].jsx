import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import CustomMarkdown from '../../components/CustomMarkdown/CustomMarkdown';
import Layout from '../../components/Layout';
import { fetchAPI } from '../../utils/api';
import styles from '../../styles/Project.module.scss';

export default function Project({ projects, project, global }) {
  const { locale } = useRouter();
  let frenchPath = '';
  let englishPath = '';

  // As the project with different languages have different slug, we need to
  // determine the url for each language for the language switcher
  if (locale === 'en') {
    frenchPath = `/projects/${projects.find((p) => p.id === project.localizations[0].id).slug}`;
    englishPath = `/projects/${project.slug}`;
  } else {
    frenchPath = `/projects/${project.slug}`;
    englishPath = `/projects/${projects.find((p) => p.id === project.localizations[0].id).slug}`;
  }

  return (
    <Layout global={global} whiteNav frenchPath={frenchPath} englishPath={englishPath}>
      <NextSeo
        title={project.title}
        description={project.description}
        languageAlternates={[{
          hrefLang: 'fr',
          href: `https://www.thibault-barrat.com${frenchPath}`,
        },
        {
          hrefLang: 'en',
          href: `https://www.thibault-barrat.com/en${englishPath}`,
        }]}
        openGraph={{
          // Title and description are mandatory
          title: project.title,
          description: project.description,
          // Only include OG image if we have it
          // Careful: if you disable image optimization in Strapi, this will break
          ...(project.image && {
            images: Object.values(project.image.formats).map((image) => ({
              url: image.url,
              width: image.width,
              height: image.height,
            })),
          }),
        }}
      />
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
              {locale === 'fr' ? 'Voir le code' : 'See the code'}
            </a>
          )}
          {project.lien && (
            <a
              href={project.lien}
              target="_blank"
              rel="noopener noreferrer"
            >
              {locale === 'fr' ? 'Visiter le site' : 'Visit the website'}
            </a>
          )}
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.project;
  const [projects, global] = await Promise.all([
    fetchAPI('/projects?_locale=all'),
    fetchAPI(`/global?_locale=${context.locale}`),
  ]);

  // Fetch to projects with slug parameter returns an array of one project
  // so we need to get the first element of the array
  return {
    props: {
      projects,
      project: projects.find((p) => p.slug === slug),
      global,
    },
  };
}

export async function getStaticPaths() {
  const projects = await fetchAPI('/projects?_locale=all');

  const paths = projects.map((project) => ({
    params: {
      project: project.slug,
    },
    locale: project.locale,
  }));

  return {
    paths,
    fallback: false,
  };
}
