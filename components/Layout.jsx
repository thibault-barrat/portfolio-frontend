import React, { useContext } from 'react';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import ThemeContext from '../contexts/ThemeContext';
import styles from '../styles/Layout.module.scss';

export default function Layout({
  children, global, sectionRefs, whiteNav, frenchPath, englishPath,
}) {
  const {
    defaultMeta, navbar, footer, favicon, linkedInUrl, twitterUrl, githubUrl,
  } = global;
  const { isDark } = useContext(ThemeContext);
  const { asPath, locale } = useRouter();

  const variantsDiv = {
    initial: { scaleY: 1 },
    enter: { scaleY: 0, borderRadius: '0px', originY: [0, 0, 0, 0] },
    exit: { scaleY: 1, originY: [1, 1, 1, 1], borderRadius: ['0% 0% 0px 0px / 0% 0% 0px 0px', '100% 100% 0px 0px / 30% 30% 0px 0px', '100% 100% 0px 0px / 30% 30% 0px 0px', '0% 0% 0px 0px / 0% 0% 0px 0px'] },
  };

  const variantsChildDiv = {
    initial: { scaleY: 1 },
    enter: { scaleY: 0 },
    exit: { scaleY: 1 },
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={favicon.url} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo
        titleTemplate={defaultMeta.titleTemplate}
        defaultTitle={defaultMeta.defaultTitle}
        canonical={locale === 'fr' ? `https://www.thibault-barrat.com${asPath}` : `https://www.thibault-barrat.com/en${asPath}`}
        languageAlternates={[{
          hrefLang: 'fr',
          href: `https://www.thibault-barrat.com${asPath}`,
        },
        {
          hrefLang: 'en',
          href: `https://www.thibault-barrat.com/en${asPath}`,
        }]}
        // Only included Twitter data if we have it
        twitter={{
          ...(defaultMeta.twitterCardType && { cardType: defaultMeta.twitterCardType }),
          // Handle is the twitter username of the content creator
          ...(defaultMeta.twitterUsername && { handle: defaultMeta.twitterUsername }),
        }}
        openGraph={{
          url: (locale === 'fr' ? `https://www.thibault-barrat.com${asPath}` : `https://www.thibault-barrat.com/en${asPath}`),
          type: 'website',
          locale: `${locale}`,
        }}
      />
      <div className={`layout ${isDark ? 'dark' : 'light'}`}>
        <Navbar
          navbar={navbar}
          linkedInUrl={linkedInUrl}
          twitterUrl={twitterUrl}
          githubUrl={githubUrl}
          sectionRefs={sectionRefs}
          white={whiteNav}
          frenchPath={frenchPath}
          englishPath={englishPath}
        />
        {children}
        <motion.div
          className={styles.transition}
          variants={variantsDiv}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ type: 'linear', duration: 1, times: [0, 0.1, 0.9, 1] }}
        >
          <motion.div
            className={styles['transition-child']}
            variants={variantsChildDiv}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ type: 'linear', duration: 1, times: [0, 0.1, 0.9, 1] }}
          />
        </motion.div>
        <Footer
          footer={footer}
          linkedInUrl={linkedInUrl}
          twitterUrl={twitterUrl}
          githubUrl={githubUrl}
        />
      </div>
    </>
  );
}
