import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
    },
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path: '/register',
      element: <Register></Register>
    }
  ]);

export default router;