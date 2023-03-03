import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const { user, logIn } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const notifyLogin = () =>
    toast.success("Login Successful!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');//when called again, makes sure error is empty
    try {
      await logIn(email, password);
      notifyLogin();
      navigate("/");
    } catch (error) {
      // console.log(error);
      setError(error.message); 
    }
  };
  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          alt="background"
          src="https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
        />
        {/* overlay */}
        <div className="absolute bg-black/60 top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-primaryColor ">
            {/* form container */}
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign In</h1>
              {error ? <p className="pt-3 text-red-300">Wrong email or password</p> : ''}
              <form onSubmit={handleLogin} className="w-full flex flex-col py-4">
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="p-3 my-2 bg-gray-600 rounded"
                  type="email"
                  placeholder="Email"
                />
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="p-3 my-2 bg-gray-600 rounded"
                  type="password"
                  placeholder="Password"
                />
                <button className="bg-primaryColor my-6 py-3 rounded font-bold text-black">
                  Sign In
                </button>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <p>
                    <input type="checkbox" /> Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-500 text-sm mr-2">
                    Don't have an account?
                  </span>
                  <Link to={"/signup"}>Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
