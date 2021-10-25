import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styles from './Section.module.scss';

const Section = forwardRef(({
  children, title, description, id,
}, ref) => (
  <section id={id} ref={ref}>
    <div className="container">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {children}
    </div>
  </section>
));

Section.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

Section.displayName = 'Section';

export default Section;
