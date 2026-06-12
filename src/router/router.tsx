import { createBrowserRouter } from "react-router";
import Layout from "../layouts/layout";
import HomePage from "../pages/HomePage";
import PsychologistsPage from "../pages/PsychologistsPage";
import FavoritesPage from "../pages/FavoritesPage";
import PrivateRoute from "../components/PrivateRoute";

const user = null; // Simulate user authentication status
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "psychologists", element: <PsychologistsPage /> },
      {
        path: "favorites",
        element: (
          <PrivateRoute isLoggedIn={user !== null}>
            <FavoritesPage />{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
]);
