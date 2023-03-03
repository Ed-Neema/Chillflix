import React ,{ useEffect, useRef, useState }from 'react';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc,doc, onSnapshot } from "firebase/firestore";
import { AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SavedShows = () => {
    const [movies, setMovies] = useState([]); 
    const {user} = UserAuth();
  // //   scroll button logic
  const slider = useRef();
  const slideLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };
  const slideRight = () => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };
  // grab components that have been saved and render

  useEffect(() => {
    // take a snapshot of the user with this email id and set the movies to have those that are saved
    onSnapshot(
      doc(db, "users", `${user?.email}`), (doc) => {
        setMovies(doc.data()?.savedShows);
        
      })
  }, [user?.email]); //everytime the email changes, fire the function
  
  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      notifyDelete();
      await updateDoc(movieRef, {
        savedShows: result,
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  const notifyDelete = () =>
    toast.error("Delete Successful!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  return (
    <div>
      <h2 className="text-primaryColor font-bold md:text-xl p-4">Saved</h2>
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
            return (
              <div
                key={id}
                className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                  alt={item?.title}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 text-primaryColor opacity-0 hover:opacity-100">
                  <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full">
                    {item?.title}
                  </p>
                  <p
                    onClick={() => deleteShow(item.id)}
                    className="absolute text-gray-400 top-4 right-4"
                  >
                    <AiFillCloseCircle size={20} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-80 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>
      <ToastContainer/>
    </div>
  );
}

export default SavedShows
