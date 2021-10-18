import PropTypes from 'prop-types';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { Typewriter } from 'react-simple-typewriter';
import { mediaPropTypes } from '../../utils/types';
import styles from './Hero.module.scss';

export default function Hero({ title, image, typewriterArray }) {
  return (
    <section id="home" className={styles.hero}>
      <div className="container">
        <h1 className={styles.title}>
          <Markdown>{title}</Markdown>
          <span>{' '}</span>
          <span className={styles.typewriter}>
            <Typewriter
              words={typewriterArray.split(/\n/)}
              loop={0}
              cursor
              delaySpeed={1000}
              cursorStyle="|"
            />
          </span>
        </h1>
      </div>
      <Image
        src={image.url}
        alt={image.alternativeText || ''}
        layout="fill"
        objectFit="contain"
        objectPosition="bottom right"
      />
    </section>
  );
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  image: mediaPropTypes.isRequired,
  typewriterArray: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};
