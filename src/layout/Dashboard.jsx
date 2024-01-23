import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="md:flex lg:flex max-w-[2520px]  mx-auto xl:px-10 md:px-10 sm:px-2 px-4">
      <div className=" lg:w-72   lg:min-h-screen bg-[#e61710]">
        <ul className="menu text-lg space-y-6 pt-20 ">
          <>
            {user?.role === "House Owner" ? (
              <li className="text-white">
                <NavLink to="/dashBoard/houseOwnerDashboard">House owner dashboard </NavLink>
              </li>
            ) : (
              <li className="text-white">
                <NavLink to="/dashBoard/houseRenterDashboard">
                  House Renter dashboard 
                </NavLink>
              </li>
            )}
          </>

          <div className="divider text-gray-900 mx-4"></div>
          <li className="text-white">
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 py-10 pt-20 px-3">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
