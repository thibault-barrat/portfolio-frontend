import { useRef } from 'react';
import Hero from '../components/Hero/Hero';
import Layout from '../components/Layout';
import Section from '../components/Section/Section';
import styles from '../styles/Home.module.scss';
import { fetchAPI } from '../utils/api';

export default function Home({
  articles, projects, homepage, global,
}) {
  // Utilisation de UseRef pour le scrollspy de la navbar
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  return (
    <Layout global={global} sectionRefs={sectionRefs}>
      <Hero
        ref={sectionRefs[0]}
        title={homepage.hero.mainText}
        image={homepage.hero.picture}
        typewriterArray={homepage.hero.typewriter}
      />
      <Section
        ref={sectionRefs[1]}
        id="about"
        title={homepage.about.title}
        description={homepage.about.description}
      />
      <Section
        ref={sectionRefs[2]}
        id="services"
        title={homepage.services.title}
        description={homepage.services.description}
      />
      <Section
        ref={sectionRefs[3]}
        id="projects"
        title={homepage.projects.title}
        description={homepage.projects.description}
      />
      <Section
        ref={sectionRefs[4]}
        id="blog"
        title={homepage.blog.title}
        description={homepage.blog.description}
      />
      <Section
        ref={sectionRefs[5]}
        id="contact"
        title={homepage.contact.title}
        description={homepage.contact.description}
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
