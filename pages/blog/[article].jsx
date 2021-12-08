import Image from 'next/image';
import Moment from 'react-moment';
import 'moment/locale/fr';
import { NextSeo } from 'next-seo';
import CustomMarkdown from '../../components/CustomMarkdown/CustomMarkdown';
import Layout from '../../components/Layout';
import { fetchAPI } from '../../utils/api';
import styles from '../../styles/Article.module.scss';

export default function Article({ article, global }) {
  return (
    <Layout global={global} whiteNav>
      <NextSeo
        title={article.title}
        description={article.description}
        openGraph={{
          // Title and description are mandatory
          title: article.title,
          description: article.description,
          // Only include OG image if we have it
          // Careful: if you disable image optimization in Strapi, this will break
          ...(article.image && {
            images: Object.values(article.image.formats).map((image) => ({
              url: image.url,
              width: image.width,
              height: image.height,
            })),
          }),
          type: 'article',
          article: {
            // Author is mandatory
            authors: ['Thibault Barrat'],
            // The publication date
            publishedTime: article.published_at,
            // The main article category
            section: 'Développement Web',
            // The tags
            tags: (article.categories && article.categories.map((category) => category.name)) || [],
          },
        }}
      />
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
        <div className={styles.date}>
          <Moment locale="fr" format="Do MMM YYYY">
            {article.published_at}
          </Moment>
        </div>
      </div>
      <CustomMarkdown className={`container ${styles.content}`} containerClassName={styles['content-image']}>
        {article.content}
      </CustomMarkdown>
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
