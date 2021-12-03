import Link from 'next/link';
import Layout from '../components/Layout';
import { fetchAPI } from '../utils/api';
import styles from '../styles/404.module.scss';

export default function Custom404({ global }) {
  return (
    <Layout global={global}>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.title}>Erreur 404 - La page demandée n&apos;a pas été trouvée</h1>
        <Link href="/" scroll={false}>
          <a className={styles.link}>Retourner à l&apos;accueil</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const global = await fetchAPI('/global');

  return {
    props: { global },
  };
}
