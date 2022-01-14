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

console.log('PROCESS>ENV:::::::', process.env);

const isDev = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 8080;
const localhost = `http://localhost:${PORT}/graphql`;
const prodHost =
  'http://foyir-mono-development.us-east-1.elasticbeanstalk.com/graphql';
const host = isDev ? localhost : prodHost;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: host,
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="recipes" element={<RecipesPage />} />
              <Route path="recipes/:recipeId" element={<RecipePage />} />
              <Route path="recipes/upload" element={<RecipeUploadPage />} />
            </Route>
          </Routes>
        </ApolloProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
