import { Route, Routes } from 'react-router-dom';
import App from './App';
// import ProtectedRoute from './components/hoc/ProtectedRoute';
import CancelPage from './pages/Checkout/Cancel';
import SuccessPage from './pages/Checkout/Success';
import NotFound from './pages/NotFound';
import RecipePage from './pages/Recipe';
import RecipesPage from './pages/Recipes';
import TagPage from './pages/Tag';

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<RecipesPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipes/:recipeId" element={<RecipePage />} />
        {/* <Route
          path="test"
          element={<ProtectedRoute component={() => <>Test</>} />}
        /> */}
        <Route path="recipes/tags/:tag" element={<TagPage />} />
        <Route path="recipes/upload" element={<NotFound />} />
        <Route path="checkout/success" element={<SuccessPage />} />
        <Route path="checkout/cancel" element={<CancelPage />} />
      </Route>
    </Routes>
  );
}
