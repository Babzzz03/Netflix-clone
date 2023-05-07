import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres, getUserLikedMovies } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";
import Card from "../components/Card";
import SearchNav from "../components/SearchNav";
import SearchCards from "../components/SearchCards";
import { fetchDataBySearch } from "../store";
import Loader from "./Loader";

export default function SearchPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
const [movie, setMovie] = useState([])
  const searchedMovies = useSelector((state) => state.netflix.searchedMovies);
  const genresLoaded = useSelector((state) => state.netflix?.genres);
const searchKey = useParams();
  const [email, setEmail] = useState(undefined);
  // onAuthStateChanged(firebaseAuth, (currentUser) => {
  //   if (currentUser) setEmail(currentUser.email);
  //   else navigate("/login");
  // });

  const dispatch = useDispatch();

useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 2000);
}, [searchedMovies]);

  useEffect(() => {
    setTimeout(() => {
      if (searchedMovies) filterData(searchedMovies);
    }, 3000);

  }, [searchedMovies]);

   const filterData = (searchedMovies) => {
     console.log(searchedMovies.results);
    const searchedExercises = searchedMovies.results?.filter((item) =>
      item.backdrop_path?.includes(item.backdrop_path)
    );
     setMovie(searchedExercises);
  };


 //const filter2 = (data) => {
//  console.log(data)
//  setMovie('');
 // data?.forEach((value) => {
 // if (value.backdrop_path) {
 //   return setMovie.push({data : data});
 // }
//})

// }

console.log(searchedMovies.results);


  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };



  return (
    <Container>
      <SearchNav isScrolled={isScrolled} />
      <div className="content flex flex2 column">
        <h1>Search Results...</h1>
        {loading ? <Loader/> : 
        <div className="grid  flex2 flex">
          {movie?.map((movie, index) => {
                return (
                  <SearchCards
                    movieData={movie}
                    index={index}
                    key={movie.id}
                    isLiked={false}
                  />
                );
              })
          }
        </div>
         }
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
      @media (max-width: 40em) {
        margin-left: 0.7rem;
        font-size: 14px;
      }
    }
    .grid {
      flex-wrap: wrap;

      gap: 1rem;
    }
  }

  .flex2 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;


