import { useState, useEffect, useRef } from 'react';
import { Scrollspy } from '@makotot/ghostui';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import { mediaPropTypes, linkPropTypes } from '../../utils/types';
import styles from './Navbar.module.scss';

export default function Navbar({
  navbar, linkedInUrl, twitterUrl, githubUrl, sectionRefs, white,
}) {
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);

  const toggleMenu = () => {
    setMobileMenuIsShown(!mobileMenuIsShown);
  };

  // We need router in order to not use scrollspy when we are not on the home page
  // and to close the mobile menu when a route change happens
  const router = useRouter();

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
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll to an anchor on click
  const scrollToAnchor = (e, ref) => {
    e.preventDefault();
    handleRouteChange();
    window.scrollTo({
      top: ref.current.offsetTop - 70,
      behavior: 'smooth',
    });
  };

  return (
    <header ref={menuRef} className={`${styles.header} ${white ? styles.white : ''} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles['header-left']}>
        <Link href="/">
          <a className={styles.logo}>
            {/* We use white logo when Navbar has white props and is not sticky */}
            {white && !isSticky ? (
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
            {router.pathname === '/'
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
                    <Link href={navLink.url}>
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
  sectionRefs: [],
  white: false,
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
};
