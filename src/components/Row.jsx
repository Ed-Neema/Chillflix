import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import Movie from "./Movie";

const Row = ({ title, fetchURL }) => {
  //rowID = for the slider to know which row needs to slide
  const [movies, setMovies] = useState([]);

  // whenever the fetchURL changes, the function should run again
  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  // //   scroll button logic
  const slider = useRef();
  const slideLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };
  const slideRight = () => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-primaryColor font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-80 cursor-pointer z-10 hidden group-hover:block"
        />
        {/* slider */}
        <div
          ref={slider}
          className="relative w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth"
        >
          {movies.map((item, id) => {
            return <Movie key={id} item={item} />;
          })}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-80 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>
    </>
  );
};

export default Row;
