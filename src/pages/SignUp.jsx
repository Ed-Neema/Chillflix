import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const notifySignUp = () =>
    toast.success("Sign Up Successful!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      await signUp(email, password);
      notifySignUp();
      navigate("/");
    } catch (error) {
      console.log(error);
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
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
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
                  Sign Up
                </button>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <p>
                    <input type="checkbox" /> Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-500 text-sm">
                    Already Subscribed?
                  </span>{" "}
                  <Link to={"/login"}>Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
