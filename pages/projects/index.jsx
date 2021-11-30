import Layout from '../../components/Layout';
import CardList from '../../components/CardList/CardList';
import { fetchAPI } from '../../utils/api';
import styles from '../../styles/Projects.module.scss';

export default function index({ projects, global }) {
  return (
    <Layout global={global}>
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
    fetchAPI('/projects'),
    fetchAPI('/global'),
  ]);

  return {
    props: { projects, global },
  };
}
