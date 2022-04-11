import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AuthorizedApolloProvider from './components/providers/AuthorizedApolloProvider';

import AppRoutes from './AppRoutes';
import AuthProvider from './components/providers/AuthProvider';
import * as dotenv from 'dotenv';
import mixpanel from 'mixpanel-browser';

dotenv.config();

const isDev =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

const mixpanel_token = process.env.REACT_APP_MIXPANEL_TOKEN as string;
mixpanel.init(mixpanel_token);

if (isDev) {
  mixpanel.opt_out_tracking();
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <AuthorizedApolloProvider>
            <AppRoutes />
          </AuthorizedApolloProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
