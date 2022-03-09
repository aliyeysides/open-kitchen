import { Route, Routes } from 'react-router-dom';
import App from './App';
import CancelPage from './pages/Checkout/Cancel';
import SuccessPage from './pages/Checkout/Success';
import RecipePage from './pages/Recipe';
import RecipesPage from './pages/Recipes';

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<RecipesPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipes/:recipeId" element={<RecipePage />} />
        <Route path="checkout/success" element={<SuccessPage />} />
        <Route path="checkout/cancel" element={<CancelPage />} />
      </Route>
    </Routes>
  );
}
