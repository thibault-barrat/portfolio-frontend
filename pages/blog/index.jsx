import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';
import CardList from '../../components/CardList/CardList';
import { fetchAPI } from '../../utils/api';
import styles from '../../styles/Blog.module.scss';

export default function index({ articles, global }) {
  return (
    <Layout global={global}>
      <NextSeo
        title={global.blogSeo.title}
        description={global.blogSeo.metaDescription}
        openGraph={{
          // Title and description are mandatory
          title: global.blogSeo.title,
          description: global.blogSeo.metaDescription,
          // Only include OG image if we have it
          // Careful: if you disable image optimization in Strapi, this will break
          ...(global.blogSeo.shareImage && {
            images: Object.values(global.blogSeo.shareImage.formats).map((image) => ({
              url: image.url,
              width: image.width,
              height: image.height,
            })),
          }),
        }}
      />
      <h1 className={styles.title}>Blog</h1>
      <div className={`container ${styles.container}`}>
        <CardList
          items={articles}
          type="blog"
        />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, global] = await Promise.all([
    fetchAPI('/articles?_sort=id:desc'),
    fetchAPI('/global'),
  ]);

  return {
    props: { articles, global },
  };
}
