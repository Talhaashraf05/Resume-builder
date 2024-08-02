import { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: '#8953d0',
      },
        background: {
            default: mode === 'light' ? '#ffffff' : '#121212',
        },
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  }), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};