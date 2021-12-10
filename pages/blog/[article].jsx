import Image from 'next/image';
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import 'moment/locale/fr';
import { NextSeo } from 'next-seo';
import CustomMarkdown from '../../components/CustomMarkdown/CustomMarkdown';
import Layout from '../../components/Layout';
import { fetchAPI } from '../../utils/api';
import styles from '../../styles/Article.module.scss';

export default function Article({ articles, article, global }) {
  const { locale } = useRouter();
  let frenchPath = '';
  let englishPath = '';

  // As the article with different languages have different slug, we need to
  // determine the url for each language for the language switcher
  if (locale === 'en') {
    frenchPath = `/blog/${articles.find((p) => p.id === article.localizations[0].id).slug}`;
    englishPath = `/blog/${article.slug}`;
  } else {
    frenchPath = `/blog/${article.slug}`;
    englishPath = `/blog/${articles.find((p) => p.id === article.localizations[0].id).slug}`;
  }

  return (
    <Layout global={global} whiteNav frenchPath={frenchPath} englishPath={englishPath}>
      <NextSeo
        title={article.title}
        description={article.description}
        languageAlternates={[{
          hrefLang: 'fr',
          href: `https://www.thibault-barrat.com${frenchPath}`,
        },
        {
          hrefLang: 'en',
          href: `https://www.thibault-barrat.com/en${englishPath}`,
        }]}
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
          <Moment locale={locale} format="Do MMM YYYY">
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
  const [articles, global] = await Promise.all([
    fetchAPI('/articles?_locale=all'),
    fetchAPI(`/global?_locale=${context.locale}`),
  ]);

  // Fetch to projects with slug parameter returns an array of one project
  // so we need to get the first element of the array
  return {
    props: {
      articles,
      article: articles.find((article) => article.slug === slug),
      global,
    },
  };
}

export async function getStaticPaths() {
  const articles = await fetchAPI('/articles?_locale=all');

  const paths = articles.map((article) => ({
    params: {
      article: article.slug,
    },
    locale: article.locale,
  }));

  return {
    paths,
    fallback: false,
  };
}
