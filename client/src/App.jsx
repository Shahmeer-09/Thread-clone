import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import Layout from "./pages/Layout";
const Authpage = lazy(() => import('./pages/Authpage'));
const Homepage = lazy(() => import('./pages/Homepage'));
const Postpage = lazy(() => import('./pages/Postpage'));
const Userpage = lazy(() => import('./pages/Userpage'));
const Update = lazy(() => import('./pages/Update'));
import Private from "./components/Pirvate";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <Private />,
        children: [
          {
             index: true,
            element: <Homepage />,
          },
          {
             path:"update",
            element: <Update/>,
          },
        ],
      },
      {
        path: "/auth",
        element: <Authpage />,
      },

      {
        path: ":username",
        element: <Userpage />,
      },
      {
        path: ":username/post/:pid",
        element: <Postpage />,
      },
    ],
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
