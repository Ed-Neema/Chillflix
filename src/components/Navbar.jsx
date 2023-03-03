import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user, logOut } = UserAuth(); //bring in the context
  // console.log(user);

  const navigate = useNavigate();

  const notifyLogout = () =>
    toast.success("Logout Successful!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  // logout function
  const handleLogout = async () => {
    try {
      await logOut();
      notifyLogout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="navbarTitle font-bold text-4xl cursor-pointer">
          CHILLFLIX
        </h1>
      </Link>
      {/* changing navbar based on whether user is logged in or not */}
      {user?.email ? (
        <div>
          <Link to={"/account"}>
            <button className="text-primaryColor pr-4">Account</button>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-primaryColor px-6 py-2 rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to={"/login"}>
            <button className="text-primaryColor pr-4">Sign In</button>
          </Link>
          <Link to={"/signup"}>
            <button className="bg-primaryColor px-6 py-2 rounded cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      )}      
    </div>
    <ToastContainer/>
    </>
  );
};

export default Navbar;
