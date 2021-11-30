import Image from 'next/image';
import MarkdownImage from '../../components/MarkdownImage/MarkdownImage';
import Layout from '../../components/Layout';
import { fetchAPI } from '../../utils/api';
import styles from '../../styles/Article.module.scss';

export default function Article({ article, global }) {
  return (
    <Layout global={global} whiteNav>
      <div className={styles['title-container']}>
        <Image
          className={styles.image}
          src={article.image.url}
          alt={article.image.alternativeText || ''}
          layout="fill"
          objectFit="cover"
        />
        <div className="container">
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.description}>{article.description}</p>
        </div>
      </div>
      <MarkdownImage className={`container ${styles.content}`} containerClassName={styles['content-image']}>
        {article.content}
      </MarkdownImage>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.article;
  const [article, global] = await Promise.all([
    fetchAPI(`/articles?slug=${slug}`),
    fetchAPI('/global'),
  ]);

  // Fetch to projects with slug parameter returns an array of one project
  // so we need to get the first element of the array
  return {
    props: {
      article: article[0],
      global,
    },
  };
}

export async function getStaticPaths() {
  const articles = await fetchAPI('/articles');

  const paths = articles.map((article) => ({
    params: {
      article: article.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
