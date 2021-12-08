import PropTypes from 'prop-types';
import Link from 'next/link';
import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import { mediaPropTypes } from '../../utils/types';
import styles from './Footer.module.scss';

export default function Footer({
  footer, linkedInUrl, twitterUrl, githubUrl,
}) {
  return (
    <footer className={styles.footer}>
      <Image
        src={footer.background.url}
        alt={footer.background.alternativeText || ''}
        layout="fill"
        objectFit="cover"
        objectPosition="50%"
      />
      <div className={styles.logo}>
        <Link href="/" scroll={false}>
          <a>
            <Image
              src={footer.logo.url}
              alt={footer.logo.alternativeText || ''}
              width={footer.logo.width}
              height={footer.logo.height}
              layout="responsive"
            />
          </a>
        </Link>
      </div>
      <div className={styles.social}>
        {linkedInUrl && (
          <a href={linkedInUrl}>
            <FaLinkedinIn />
          </a>
        )}
        {twitterUrl && (
          <a href={twitterUrl}>
            <FaTwitter />
          </a>
        )}
        {githubUrl && (
          <a href={githubUrl}>
            <FaGithub />
          </a>
        )}
      </div>
      <p className={styles.copyright}>{footer.smallText}</p>
      {/* eslint-disable-next-line react/no-danger */}
      <p className={styles.co2} dangerouslySetInnerHTML={{ __html: footer.co2 }} />
    </footer>
  );
}

Footer.defaultProps = {
  linkedInUrl: '',
  twitterUrl: '',
  githubUrl: '',
};

Footer.propTypes = {
  footer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    smallText: PropTypes.string.isRequired,
    logo: mediaPropTypes,
  }).isRequired,
  linkedInUrl: PropTypes.string,
  twitterUrl: PropTypes.string,
  githubUrl: PropTypes.string,
};
