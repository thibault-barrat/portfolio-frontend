/* eslint-disable react/jsx-props-no-spreading */
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Router from 'next/router';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps, router }) {
  // issues on css modules unmounted to early durint page transition
  // https://github.com/vercel/next.js/issues/17464
  const routeChange = () => {
    // Temporary fix to avoid flash of unstyled content
    // during route transitions. Keep an eye on this
    // issue and remove this code when resolved:
    // https://github.com/vercel/next.js/issues/17464

    const tempFix = () => {
      const allStyleElems = document.querySelectorAll('style[media="x"]');
      allStyleElems.forEach((elem) => {
        elem.removeAttribute('media');
      });
    };
    tempFix();
  };
  useEffect(() => {
    router.push(router.asPath);
  }, []);

  Router.events.on('routeChangeComplete', routeChange);
  Router.events.on('routeChangeStart', routeChange);

  // // function to handle scroll to top or to anchor after page transition
  // const handleExitComplete = () => {
  //   if (typeof window !== 'undefined') {
  //     const { hash } = window.location;
  //     if (hash) {
  //       const element = document.getElementById(hash.replace('#', ''));
  //       if (element) {
  //         window.scrollTo(0, element.offsetParent.offsetTop);
  //       }
  //     } else {
  //       window.scrollTo(0, 0);
  //     }
  //   }
  //   // const path = router.asPath;
  //   // if (path.indexOf('#') > -1) {
  //   //   const hash = path.split('#')[1];
  //   //   const element = document.getElementById(hash);
  //   //   if (element) {
  //   //     element.scrollIntoView();
  //   //   }
  //   // } else {
  //   //   window.scrollTo(0, 0);
  //   // }
  // };

  return (
    <ThemeProvider>
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;
