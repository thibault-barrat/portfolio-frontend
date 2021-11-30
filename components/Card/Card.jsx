import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import { mediaPropTypes } from '../../utils/types';
import styles from './Card.module.scss';

export default function Card({ project }) {
  return (
    <div className={styles['card-container']}>
      <Link href={`/projects/${project.slug}`}>
        <a className={styles.card}>
          <div className={styles['image-container']}>
            <Image
              className={styles.image}
              src={project.image.url}
              alt={project.image.alternativeText || ''}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.content}>
            <div className={styles.tags}>
              {project.categories.map((category) => (
                <span
                  key={category.id}
                  className={styles.category}
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </span>
              ))}
            </div>
            <h4 className={styles.title}>{project.title}</h4>
            <button type="button" className={styles.button}>Voir le projet</button>
          </div>
        </a>
      </Link>
    </div>
  );
}

Card.propTypes = {
  project: PropTypes.shape({
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
};
