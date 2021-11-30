import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import styles from './ServiceCard.module.scss';

export default function ServiceCard({ service }) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h4 className={styles.title}>{service.title}</h4>
        {!service.tarif_journalier && (
          <div className={styles.price}>
            <span className={styles['price-before']}>à partir de</span>
            {service.tarif}
            <span className={styles['price-after']}>€ *</span>
          </div>
        )}
        {service.tarif_journalier && (
          <div className={styles.price}>
            <span className={styles['price-before']}>Taux journalier moyen</span>
            {service.tarif}
            <span className={styles['price-after']}>€/jour</span>
          </div>
        )}
        <Markdown className={styles.description}>
          {service.description}
        </Markdown>
      </div>
    </div>
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
