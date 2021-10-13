import Layout from '../../components/Layout';
import { fetchAPI } from '../../utils/api';

export default function index({ projects, global }) {
  return (
    <Layout global={global}>
      <h1>Mes projets</h1>
    </Layout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [projects, global] = await Promise.all([
    fetchAPI('/projects'),
    fetchAPI('/global'),
  ]);

  return {
    props: { projects, global },
  };
}
