import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import { Fade } from 'react-awesome-reveal';
import 'moment/locale/fr';
import { mediaPropTypes } from '../../utils/types';
import styles from './Card.module.scss';

export default function Card({ item, type }) {
  const { locale } = useRouter();
  return (
    <Fade className={styles['card-container']} direction="up" triggerOnce>
      <Link href={`/${type}/${item.slug}`} scroll={false}>
        <a className={styles.card}>
          <div className={styles['image-container']}>
            <Image
              className={styles.image}
              src={item.image.url}
              alt={item.image.alternativeText || ''}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.content}>
            <div className={styles.tags}>
              {item.categories.map((category) => (
                <span
                  key={category.id}
                  className={styles.category}
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </span>
              ))}
            </div>
            <h4 className={styles.title}>{item.title}</h4>
            <button type="button" className={styles.button}>
              {type === 'projects' && (locale === 'fr' ? 'Voir le projet' : 'Go to project')}
              {type === 'blog' && (locale === 'fr' ? 'Lire l\'article' : 'Go to article')}
            </button>
            {type === 'blog' && (
              <div className={styles.date}>
                <Moment locale={locale} format="Do MMM YYYY">
                  {item.published_at}
                </Moment>
              </div>
            )}
          </div>
        </a>
      </Link>
    </Fade>
  );
}

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: mediaPropTypes.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  type: PropTypes.string.isRequired,
};
