import Layout from '../../components/Layout';
import CardList from '../../components/CardList/CardList';
import { fetchAPI } from '../../utils/api';
import styles from '../../styles/Blog.module.scss';

export default function index({ articles, global }) {
  return (
    <Layout global={global}>
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
