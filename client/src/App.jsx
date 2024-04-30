import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Authpage, Homepage, Layout, Postpage, Userpage } from "./pages/index";
import { Container } from "@chakra-ui/react";
import {action as signupAction} from './pages/Authpage'
const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children: [
      {
        index:true,
        element: <Homepage />,
      
      },
      {
         path:"/auth",
         element: <Authpage/>,
         action: signupAction
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
    <Container maxW="620px">
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
