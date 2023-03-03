import React from 'react'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <h1 className="navbarTitle font-bold text-4xl cursor-pointer">
        CHILLFLIX
      </h1>
      <div>
        <button className="text-primaryColor pr-4">Sign In</button>
        <button className="bg-primaryColor px-6 py-2 rounded cursor-pointer">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Navbar
