import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const handleLogOut = () => {
    window.location.reload(localStorage.removeItem("token"));
  };

  const links = (
    <div className=" flex flex-wrap gap-4 font-bold text-base items-center">
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? " underline hover:scale-105  " : "")}
      >
        <button>Home</button>
      </NavLink>
    </div>
  );

  return (
    <div className="w-full shadow-md">
      <div className="navbar bg-base-100 flex justify-between lg:w-[1200px] py-3 mx-auto">
        <div className="navbar-start   ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4  z-[1] py-7 px-4    shadow bg-base-100 rounded-box w-96 "
            >
              {links}
            </ul>
          </div>
          <div>
            <Link to={"/"} className="">
              <img
                className="w-24"
                src="https://i.postimg.cc/W1kk8NZg/logo.png"
                alt=""
              />
            </Link>
          </div>
        </div>

        <div className="navbar-end flex gap-6">
          <ul className="menu menu-horizontal px-1 hidden lg:flex ">{links}</ul>

          {user?.email ? (
            <div className="flex gap-5 font-bold">
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) => (isActive ? " font-bold  " : "")}
              >
                <button className="hover:scale-105">Dashboard</button>
              </NavLink>
              <button onClick={handleLogOut} className="hover:scale-105">LogOut</button>
            </div>
          ) : (
            <div className="flex gap-5 font-bold">
              <Link to={"/login"} className="">
                Login
              </Link>
              <Link to={"/register "} className="">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
