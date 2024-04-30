import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, Postpage, Userpage } from "./pages/index";
import { Container } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
    <Container maxW="620px">
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
