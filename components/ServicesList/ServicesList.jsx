import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import ServiceCard from '../ServiceCard/ServiceCard';
import styles from './ServicesList.module.scss';

export default function ServicesList({ services }) {
  return (
    <>
      <div className={styles['service-list']}>
        {services.service.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <Markdown className={styles.conditions}>
        {services.conditions}
      </Markdown>
    </>
  );
}

ServicesList.propTypes = {
  services: PropTypes.shape({
    conditions: PropTypes.string.isRequired,
    service: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        tarif_journalier: PropTypes.bool.isRequired,
        tarif: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};
