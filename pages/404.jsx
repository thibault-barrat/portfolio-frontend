import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { fetchAPI } from '../utils/api';
import styles from '../styles/404.module.scss';

export default function Custom404({ global }) {
  const { locale } = useRouter();
  return (
    <Layout global={global}>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.title}>{locale === 'fr' ? 'Erreur 404 - La page demandée n\'a pas été trouvée' : 'Error 404 - The requested page was not found'}</h1>
        <Link href="/" scroll={false}>
          <a className={styles.link}>{locale === 'fr' ? 'Retourner à l\'accueil' : 'Back to home'}</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const global = await fetchAPI(`/global?_locale=${context.locale}`);

  return {
    props: { global },
  };
}
