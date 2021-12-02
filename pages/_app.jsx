/* eslint-disable react/jsx-props-no-spreading */
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
