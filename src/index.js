import React from 'react';
import ReactDOM from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Router />
  </ThemeProvider>,
);
