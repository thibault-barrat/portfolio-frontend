import Layout from '../../components/Layout';
import { fetchAPI } from '../../utils/api';

export default function index({ articles, global }) {
  return (
    <Layout global={global}>
      <h1>Le blog</h1>
    </Layout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, global] = await Promise.all([
    fetchAPI('/articles'),
    fetchAPI('/global'),
  ]);

  return {
    props: { articles, global },
  };
}
