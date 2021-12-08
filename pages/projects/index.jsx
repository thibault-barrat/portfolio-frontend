import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';
import CardList from '../../components/CardList/CardList';
import { fetchAPI } from '../../utils/api';
import styles from '../../styles/Projects.module.scss';

export default function index({ projects, global }) {
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
      <h1 className={styles.title}>Mes projets</h1>
      <div className={`container ${styles.container}`}>
        <CardList
          items={projects}
          type="projects"
        />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [projects, global] = await Promise.all([
    fetchAPI('/projects?_sort=id:desc'),
    fetchAPI('/global'),
  ]);

  return {
    props: { projects, global },
  };
}
