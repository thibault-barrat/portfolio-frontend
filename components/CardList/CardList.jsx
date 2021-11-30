import PropTypes from 'prop-types';
import Card from '../Card/Card';
import { mediaPropTypes } from '../../utils/types';
import styles from './CardList.module.scss';

export default function CardList({ items, type }) {
  return (
    <div className={styles['card-list']}>
      {/* For projects and articles,
      we reverse the projects array to display the last added project in first */}
      {type === 'project' && items.reverse().map((project) => (
        <Card key={project.id} project={project} />
      ))}
    </div>
  );
}

CardList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
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
  ).isRequired,
  type: PropTypes.string.isRequired,
};
