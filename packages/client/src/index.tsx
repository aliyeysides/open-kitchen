import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AuthorizedApolloProvider from './components/AuthorizedApolloProvider';
// import { Auth0Provider } from './components/Auth0Context';
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';

import AppRoutes from './AppRoutes';

console.log('REACT NODE ENV', process.env.NODE_ENV);

const config: Auth0ProviderOptions = {
  domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
  clientId: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
  audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
  redirectUri: window.location.origin,
  useRefreshTokens: true,
  cacheLocation: 'localstorage',
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Auth0Provider {...config}>
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
