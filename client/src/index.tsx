import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { createUploadLink } from 'apollo-upload-client';
import RecipePage from './pages/recipes/Recipe';
import RecipesPage from './pages/recipes/Recipes';
import RecipeUploadPage from './pages/recipes/RecipeUpload';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: 'http://localhost:8080/graphql' }),
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="recipes" element={<RecipesPage />} />
              <Route path="recipes/:recipeId" element={<RecipePage />} />
              <Route path="recipes/upload" element={<RecipeUploadPage />} />
            </Route>
          </Routes>
        </ApolloProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
