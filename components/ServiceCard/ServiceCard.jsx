import PropTypes from 'prop-types';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { useRouter } from 'next/router';
import { Fade } from 'react-awesome-reveal';
import styles from './ServiceCard.module.scss';

export default function ServiceCard({ service }) {
  const { locale } = useRouter();
  return (
    <Fade className={styles.card} direction="up" triggerOnce>
      <div className={styles.content}>
        <h4 className={styles.title}>{service.title}</h4>
        {!service.tarif_journalier && (
          <div className={styles.price}>
            <span className={styles['price-before']}>{locale === 'fr' ? 'à partir de' : 'starting at'}</span>
            {service.tarif}
            <span className={styles['price-after']}>€ *</span>
          </div>
        )}
        {service.tarif_journalier && (
          <div className={styles.price}>
            <span className={styles['price-before']}>{locale === 'fr' ? 'Taux journalier moyen' : 'Average daily rate'}</span>
            {service.tarif}
            <span className={styles['price-after']}>{locale === 'fr' ? '€/jour' : '€/day'}</span>
          </div>
        )}
        <Markdown className={styles.description}>
          {service.description}
        </Markdown>
        <Link href="/#contact">
          <a className={styles.cta}>
            {locale === 'fr' ? 'Demander un devis' : 'Ask for a quote'}
          </a>
        </Link>
      </div>
    </Fade>
  );
}

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    tarif_journalier: PropTypes.bool.isRequired,
    tarif: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
