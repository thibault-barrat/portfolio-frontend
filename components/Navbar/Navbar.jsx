import { useState, useEffect } from 'react';
import { Scrollspy } from '@makotot/ghostui';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import { mediaPropTypes, linkPropTypes } from '../../utils/types';
import styles from './Navbar.module.scss';

export default function Navbar({
  navbar, linkedInUrl, twitterUrl, githubUrl, sectionRefs,
}) {
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);

  const toggleMenu = () => {
    setMobileMenuIsShown(!mobileMenuIsShown);
  };

  // For the sticky navbar
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    setIsSticky(window.pageYOffset > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles['header-left']}>
        <Link href="/">
          <a className={styles.logo}>
            <Image
              src={navbar.logo.url}
              alt={navbar.logo.alternativeText || ''}
              width={navbar.logo.width}
              height={navbar.logo.height}
              layout="responsive"
            />
          </a>
        </Link>
        <span hidden id="menu-label">Menu principal</span>
        <nav
          className={`${styles.menu} ${mobileMenuIsShown ? styles['menu--open'] : ''}`}
          aria-labelledby="menu-label"
          id="navigation"
        >
          <ul>
            <Scrollspy sectionRefs={sectionRefs} offset={-70}>
              {({ currentElementIndexInViewport }) => (
                navbar.links.map((navLink, index) => (
                  <li key={navLink.id}>
                    <Link href={navLink.url}>
                      <a className={currentElementIndexInViewport === index ? styles.active : ''}>
                        {navLink.text}
                      </a>
                    </Link>
                  </li>
                ))
              )}
            </Scrollspy>
          </ul>
        </nav>
      </div>
      <div className={styles['header-right']}>
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
        <button
          className={`${styles.hamburger} ${mobileMenuIsShown ? styles['hamburger--open'] : ''}`}
          type="button"
          aria-expanded="false"
          aria-controls="navigation"
          aria-labelledby="menu-label"
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

Navbar.defaultProps = {
  linkedInUrl: '',
  twitterUrl: '',
  githubUrl: '',
};

Navbar.propTypes = {
  navbar: PropTypes.shape({
    logo: PropTypes.shape({
      image: mediaPropTypes,
      url: PropTypes.string,
    }),
    links: PropTypes.arrayOf(linkPropTypes),
  }).isRequired,
  linkedInUrl: PropTypes.string,
  twitterUrl: PropTypes.string,
  githubUrl: PropTypes.string,
};
