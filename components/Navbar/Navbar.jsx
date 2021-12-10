import {
  useState, useEffect, useRef, useContext,
} from 'react';
import { Scrollspy } from '@makotot/ghostui';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';
import { MdLightMode, MdDarkMode, MdLanguage } from 'react-icons/md';
import Image from 'next/image';
import { mediaPropTypes, linkPropTypes } from '../../utils/types';
import styles from './Navbar.module.scss';
import ThemeContext from '../../contexts/ThemeContext';

export default function Navbar({
  navbar, linkedInUrl, twitterUrl, githubUrl, sectionRefs, white, frenchPath, englishPath,
}) {
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);
  const [languageSwitcherIsShown, setLanguageSwitcherIsShown] = useState(false);

  const toggleMenu = () => {
    setMobileMenuIsShown(!mobileMenuIsShown);
  };

  const { isDark, toggleDark } = useContext(ThemeContext);

  // We need router in order to not use scrollspy when we are not on the home page
  // and to close the mobile menu when a route change happens
  const router = useRouter();

  // Function to handle change of locale
  const changeLocale = (locale) => {
    document.cookie = `NEXT_LOCALE=${locale}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    if (frenchPath && englishPath) {
      const url = locale === 'fr' ? frenchPath : englishPath;
      router.push(url, url, { locale });
    } else {
      router.push(
        { pathname: router.pathname, query: router.query }, router.asPath, { locale },
      );
    }
  };

  const handleRouteChange = () => {
    if (mobileMenuIsShown) {
      setMobileMenuIsShown(false);
    }
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  });

  // We want to close the navigation menu when the user clicks outside of it
  // We use a ref to get the DOM node of the menu
  const menuRef = useRef();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && mobileMenuIsShown) {
      setMobileMenuIsShown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  // For the sticky navbar
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    setIsSticky(window.pageYOffset > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll to an anchor on click
  const scrollToAnchor = (e, ref) => {
    e.preventDefault();
    handleRouteChange();
    window.scrollTo({
      top: ref.current.offsetTop - 65,
      behavior: 'smooth',
    });
  };

  return (
    <header ref={menuRef} className={`${styles.header} ${white ? styles.white : ''} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles['header-left']}>
        <Link href="/" scroll={false}>
          <a className={styles.logo}>
            {/* We use white logo when Navbar has white props and is not sticky */}
            {(white && !isSticky) || isDark ? (
              <Image
                src={navbar.logo_white.url}
                alt={navbar.logo_white.alternativeText || ''}
                width={navbar.logo_white.width}
                height={navbar.logo_white.height}
                layout="responsive"
              />
            ) : (
              <Image
                src={navbar.logo.url}
                alt={navbar.logo.alternativeText || ''}
                width={navbar.logo.width}
                height={navbar.logo.height}
                layout="responsive"
              />
            )}

          </a>
        </Link>
        <span hidden id="menu-label">Menu principal</span>
        <nav
          className={`${styles.menu} ${mobileMenuIsShown ? styles['menu--open'] : ''}`}
          aria-labelledby="menu-label"
          id="navigation"
        >
          <ul>
            {/* When we are on home page, we use scrollspy
            and we use standard anchor tag to enable scrollTo feature on the page */}
            {router.pathname === '/' && sectionRefs.every((ref) => ref !== null)
              ? (
                <Scrollspy sectionRefs={sectionRefs} offset={-70}>
                  {({ currentElementIndexInViewport }) => (
                    navbar.links.map((navLink, index) => (
                      <li key={navLink.id}>
                        <a
                          href={navLink.url}
                          className={currentElementIndexInViewport === index ? styles.active : ''}
                          onClick={(event) => scrollToAnchor(event, sectionRefs[index])}
                        >
                          {navLink.text}
                        </a>
                      </li>
                    ))
                  )}
                </Scrollspy>
              )
              : (
                navbar.links.map((navLink) => (
                  <li key={navLink.id}>
                    <Link href={navLink.url} scroll={false}>
                      <a>{navLink.text}</a>
                    </Link>
                  </li>
                ))
              )}
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
        <div className={styles['dark-mode']}>
          {isDark ? (
            <button type="button" onClick={toggleDark}>
              <MdLightMode />
            </button>
          ) : (
            <button type="button" onClick={toggleDark}>
              <MdDarkMode />
            </button>
          )}
        </div>
        <div
          className={styles['lang-switch']}
          onClick={() => setLanguageSwitcherIsShown(!languageSwitcherIsShown)}
          onKeyPress={() => setLanguageSwitcherIsShown(!languageSwitcherIsShown)}
          role="button"
          tabIndex={0}
        >
          <div className={styles['lang-switch__icon']}>
            <MdLanguage />
          </div>
          <span className={styles.locale}>{router.locale === 'fr' ? 'Français' : 'English'}</span>
          <ul className={languageSwitcherIsShown ? `${styles.languages} ${styles['languages--open']}` : styles.languages}>
            <li>
              <button
                onClick={() => changeLocale('fr')}
                type="button"
              >
                Français
              </button>
            </li>
            <li>
              <button
                onClick={() => changeLocale('en')}
                type="button"
              >
                English
              </button>
            </li>
            {/* <li>
              <Link href={router.asPath} locale="fr" scroll={false}>
                <a>
                  Français
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/en${router.asPath}`} locale="en" scroll={false}>
                <a>
                  English
                </a>
              </Link>
            </li> */}
          </ul>
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
  sectionRefs: Array(6).fill(null),
  white: false,
  frenchPath: '',
  englishPath: '',
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
  sectionRefs: PropTypes.arrayOf(PropTypes.object),
  white: PropTypes.bool,
  frenchPath: PropTypes.string,
  englishPath: PropTypes.string,
};
