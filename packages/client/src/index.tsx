import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import RecipePage from './pages/Recipe';
import RecipesPage from './pages/Recipes';
import RecipeUploadPage from './pages/RecipeUpload';
import AuthorizedApolloProvider from './components/AuthApolloProvider';
import { Auth0Provider } from './components/Auth0Context'
import ProfilePage from './pages/Profile/profile';

console.log('REACT NODE ENV', process.env.NODE_ENV);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Auth0Provider>
          <AuthorizedApolloProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="recipes" element={<RecipesPage />} />
                <Route path="recipes/:recipeId" element={<RecipePage />} />
                <Route path="recipes/upload" element={<RecipeUploadPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Routes>
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
