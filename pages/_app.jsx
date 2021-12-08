/* eslint-disable react/jsx-props-no-spreading */
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Router from 'next/router';
import Script from 'next/script';
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

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />

      <Script id="ga-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
      <ThemeProvider>
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
