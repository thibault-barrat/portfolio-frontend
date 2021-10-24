import PropTypes from 'prop-types';
import styles from './Section.module.scss';

export default function Section({
  children, title, description, id,
}) {
  return (
    <section id={id}>
      <div className="container">
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        {children}
      </div>
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
