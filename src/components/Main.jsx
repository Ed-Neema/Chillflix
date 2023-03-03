import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Requests";
const Main = () => {
  // holds our movies
  const [movies, setMovies] = useState([]);

  // picking a random movie that will be used as a hero
  const movie = movies[Math.floor(Math.random() * movies.length)];

  // useEffect to make the request when component mounts
  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  return (
    <div className="w-full h-[550px] text-primaryColor overflow-hidden">
      <div className="w-full object-cover">
        {/* dark overlay */}
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
          className="object-cover"
        />
        <div className="absolute w-full mt-2 md:mt-0 top-[10%] md:top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          {/* buttons */}
          <div className="my-4">
            <button className="border bg-primaryColor text-black border-primaryColor100 py-2 px-5 rounded">
              Play
            </button>
            <button className="border  text-primaryColor100 border-primaryColor100 py-2 px-5 ml-4 rounded">
              Watch Later
            </button>
          </div>
          {/* other text  */}
          <p className="text-primaryColor200 text-sm">
            Released: {movie?.release_date}
          </p>
          {/* should fill less and less the more the screen enlarges */}
          <p className="text-primaryColor100 hidden md:flex mt-4 w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">
            {movie?.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
