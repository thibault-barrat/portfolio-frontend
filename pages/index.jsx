import Hero from '../components/Hero/Hero';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.scss';
import { fetchAPI } from '../utils/api';

export default function Home({
  articles, projects, homepage, global,
}) {
  return (
    <Layout global={global}>
      <Hero
        title={homepage.hero.mainText}
        image={homepage.hero.picture}
        typewriterArray={homepage.hero.typewriter}
      />
    </Layout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, projects, homepage, global] = await Promise.all([
    fetchAPI('/articles'),
    fetchAPI('/projects'),
    fetchAPI('/homepage'),
    fetchAPI('/global'),
  ]);

  return {
    props: {
      articles, projects, homepage, global,
    },
  };
}
