import axios from "axios";
import React, { useEffect, useState } from "react";

import Movie from "./Movie";

const Row = ({ title, fetchURL }) => {
  const [movies, setMovies] = useState([]);

  // whenever the fetchURL changes, the function should run again
  useEffect(() => {
    axios.get(fetchURL).then((response)=>{
        setMovies(response.data.results);
    });
  }, [fetchURL]);
  return (
    <>
      <h2 className="text-primaryColor font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center">
        {/* slider */}
        <div>
        {movies.map((item,id)=> {
            return (
              <Movie key={id} item={item}/>
            );
        })}                 
        </div>
      </div>
    </>
  );
};

export default Row;
