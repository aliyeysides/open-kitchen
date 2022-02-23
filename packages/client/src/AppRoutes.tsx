import { Route, Routes } from 'react-router-dom';
import App from './App';
import RecipePage from './pages/Recipe';
import RecipesPage from './pages/Recipes';

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<RecipesPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipes/:recipeId" element={<RecipePage />} />
      </Route>
    </Routes>
  );
}
