import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AuthorizedApolloProvider from './components/AuthorizedApolloProvider';
import { Auth0Provider } from './components/Auth0Context';

import AppRoutes from './AppRoutes';

console.log('REACT NODE ENV', process.env.NODE_ENV);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Auth0Provider>
          <AuthorizedApolloProvider>
            <AppRoutes />
          </AuthorizedApolloProvider>
        </Auth0Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
