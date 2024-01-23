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
import HouseDataEdit from "../Page/HouseDataEdit/HouseDataEdit";
import HouseDetail from "../Page/HouseDetail/HouseDetail";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
          path: '/',
          element: <Home></Home>,
          loader:()=>fetch('http://localhost:5000/houseData')
        },
        {
          path:'/houseDetail/:id',
          element: <HouseDetail></HouseDetail>,
          loader: ({params})=>fetch(`http://localhost:5000/houseDetail/${params.id}`)
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
          path: '/dashboard/houseOwnerDashboard/:id',
          element:<HouseDataEdit></HouseDataEdit>,
          loader: ({params})=>fetch(`http://localhost:5000/updateHouseData/${params.id}`)
        },
        {
          path: '/dashboard/houseRenterDashboard',
          element: <HouseRanterDashboard></HouseRanterDashboard>,
          // loader: ()=> fetch('http://localhost:5000/bookingData')
        }
      ]
    }
  ]);

export default router;