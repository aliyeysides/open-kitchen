import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AuthorizedApolloProvider from './components/providers/AuthorizedApolloProvider';

import AppRoutes from './AppRoutes';
import AuthProvider from './components/providers/AuthProvider';
import * as dotenv from 'dotenv';
import NotAuthorized from './pages/NotAuthorized';
import mixpanel from 'mixpanel-browser';

dotenv.config();
const isDev =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
const mixpanelSecret = process.env.REACT_APP_MIXPANEL_SECRET as string;

mixpanel.init(mixpanelSecret);

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
          <Routes>
            <Route path="/not-authorized" element={<NotAuthorized />} />
          </Routes>
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
