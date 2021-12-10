import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import CardList from '../../components/CardList/CardList';
import { fetchAPI } from '../../utils/api';
import styles from '../../styles/Projects.module.scss';

export default function Projects({ projects, global }) {
  const { locale } = useRouter();
  return (
    <Layout global={global}>
      <NextSeo
        title={global.projectSeo.title}
        description={global.projectSeo.metaDescription}
        openGraph={{
          // Title and description are mandatory
          title: global.projectSeo.title,
          description: global.projectSeo.metaDescription,
          // Only include OG image if we have it
          // Careful: if you disable image optimization in Strapi, this will break
          ...(global.projectSeo.shareImage && {
            images: Object.values(global.projectSeo.shareImage.formats).map((image) => ({
              url: image.url,
              width: image.width,
              height: image.height,
            })),
          }),
        }}
      />
      <h1 className={styles.title}>{locale === 'fr' ? 'Mes projets' : 'My projects'}</h1>
      <div className={`container ${styles.container}`}>
        <CardList
          items={projects}
          type="projects"
        />
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  // Run API calls in parallel
  const [projects, global] = await Promise.all([
    fetchAPI(`/projects?_sort=id:desc&_locale=${context.locale}`),
    fetchAPI(`/global?_locale=${context.locale}`),
  ]);

  return {
    props: { projects, global },
  };
}
