import {
  createContext, useState, useEffect,
} from 'react';

// we define the default context which sould be overridden
const defaultContext = {
  toggleDark: () => {},
  isDark: true,
};

// we create the context from the default context
const ThemeContext = createContext(defaultContext);

// we define and export a component which will be used to wrap the app
// in order to define context with a useState hook
export const ThemeProvider = ({ children }) => {
  // theme is dark by default
  const [isDark, setIsDark] = useState(true);

  // after render of the component, we check the local storage
  useEffect(() => {
    // read the value in local storage
    const localDark = JSON.parse(localStorage.getItem('ThemeContext:isDark'));
    // if the value is defined, we set the state
    if (localDark !== undefined && localDark !== null) {
      setIsDark(localDark);
    } else if (
      // we check if user want a light theme from its navigator
      window.matchMedia
      && window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      setIsDark(false);
    }
  }, []);

  // we define "better" context than defaultContext
  const context = {
    toggleDark: () => {
      // when we toggle the theme, we set the local storage
      localStorage.setItem('ThemeContext:isDark', String(!isDark));
      setIsDark(!isDark);
    },
    isDark,
  };

  // we generate a provider for our context
  return (
    <ThemeContext.Provider value={context}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
