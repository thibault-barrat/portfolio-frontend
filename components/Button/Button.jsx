import PropTypes from 'prop-types';
import styles from './Button.module.scss';

export default function Button({
  className, type, onClick, text,
}) {
  return (
    <button
      className={`${className} ${styles.button}`}
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  onClick: () => {},
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};
