import { Navigate, Route, Routes } from 'react-router-dom';

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
