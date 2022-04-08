import { Navigate, Route, Routes } from 'react-router-dom';

// TODO: use a diff approach than localStorage, maybe useLocation?

export default function CancelPage() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={`/recipes/${localStorage.getItem('last-viewed-recipe')}`}
          />
        }
      />
    </Routes>
  );
}
