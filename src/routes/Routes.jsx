import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import Dashboard from "../layout/Dashboard";
import Home from "../Page/Home/Home";
import HouseOwnerDashboard from "../Page/HouseOwnerDashboard/HouseOwnerDashboard";
import HouseRanterDashboard from "../Page/HouseRenterDashboard/HouseRanterDashboard";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
          path: '/',
          element: <Home></Home>
        }
      ]
    },
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path: '/register',
      element: <Register></Register>
    },


    //dashboard layout
    {
      path:'/dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        {
          path: '/dashboard/houseOwnerDashboard',
          element: <HouseOwnerDashboard></HouseOwnerDashboard>
        },
        {
          path: '/dashboard/houseRenterDashboard',
          element: <HouseRanterDashboard></HouseRanterDashboard>
        }
      ]
    }
  ]);

export default router;