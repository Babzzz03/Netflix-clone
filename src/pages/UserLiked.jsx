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

export default function UserLiked() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const movies = useSelector((state) => state.netflix.movies);



const [email, setEmail] = useState(undefined);
onAuthStateChanged(firebaseAuth, (currentUser) => {
  if (currentUser) setEmail(currentUser.email);
  else navigate("/login");
});

  const dispatch = useDispatch();

  useEffect(() => {
    if (email) {
        dispatch(getUserLikedMovies(email));
    }
  }, [email]);


  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };



  return <Container>
    <Navbar isScrolled={isScrolled}/>
    <div className="content flex column">
        <h1>My List</h1>
<div className="grid flex">
{
    movies.map((movie,index) => {
        return <Card  movieData={movie} index={index} key={movie.id}  isLiked={true} />
    })
}

</div>

    </div>
  </Container>;
}



const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
        font-size: 30px;
      @media (max-width: 744px) {
        margin-left: 0.2rem;
        font-size: 15px;
      }
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;