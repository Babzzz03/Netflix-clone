import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function SearchPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
const [movie, setMovie] = useState([])
  const movies = useSelector((state) => state.netflix.movies);

  const [email, setEmail] = useState(undefined);
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  const dispatch = useDispatch();

console.log(movies.results)

useEffect(() => {
const filter = () => {
  
      const searchedExercises = movies?.results?.filter((item) =>
        item.backdrop_path?.includes(item.backdrop_path)
      );

 
      setMovie(searchedExercises);
}

filter()
}, [ movies])

console.log(movie)




  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <SearchNav isScrolled={isScrolled} />
      <div className="content flex flex2 column">
        <h1>Search Results...</h1>
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
          })}
        </div>
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
    }
    .grid {
      flex-wrap: wrap;
      
      gap: 1rem;
    }
  }

  .flex2{
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;


