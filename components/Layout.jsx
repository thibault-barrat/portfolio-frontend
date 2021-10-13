import React from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import getStrapiMedia from '../utils/media';

export default function Layout({ children, global }) {
  const {
    metadata, navbar, footer, favicon, linkedInUrl, twitterUrl, githubUrl,
  } = global;
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={getStrapiMedia(favicon.url)} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NextSeo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        openGraph={{
          // Title and description are mandatory
          title: metadata.metaTitle,
          description: metadata.metaDescription,
          // Only include OG image if we have it
          // Careful: if you disable image optimization in Strapi, this will break
          ...(metadata.shareImage && {
            images: Object.values(metadata.shareImage.formats).map((image) => ({
              url: getStrapiMedia(image.url),
              width: image.width,
              height: image.height,
            })),
          }),
        }}
        // Only included Twitter data if we have it
        twitter={{
          ...(metadata.twitterCardType && { cardType: metadata.twitterCardType }),
          // Handle is the twitter username of the content creator
          ...(metadata.twitterUsername && { handle: metadata.twitterUsername }),
        }}
      />
      <Navbar
        navbar={navbar}
        linkedInUrl={linkedInUrl}
        twitterUrl={twitterUrl}
        githubUrl={githubUrl}
      />
      {children}
      <Footer
        footer={footer}
        linkedInUrl={linkedInUrl}
        twitterUrl={twitterUrl}
        githubUrl={githubUrl}
      />
    </>
  );
}
