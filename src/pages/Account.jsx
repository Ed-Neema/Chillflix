import React from "react";
import SavedShows from "../components/SavedShows";

const Account = () => {
  return (
    <>
      <div className="w-full text-primaryColor">
        <img
          className="w-full h-[400px] object-cover"
          alt="background"
          src="https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
        />
        {/* overlay */}
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[400px]"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
        </div>
      </div>
      <SavedShows/>
    </>
  );
};

export default Account;
