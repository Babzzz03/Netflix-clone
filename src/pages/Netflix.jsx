import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import logo from "../assets/logo.png";
import stranger from "../assets/stranger.jpg";
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from '../store';
import Sliders from '../components/Slider';
import Slider  from "react-slick";

export default function Netflix() {
    const [isScrolled, setIsScrolled] = useState(false)
const navigate = useNavigate();
const genresLoaded = useSelector((state) => state.netflix?.genresLoaded);
const movies = useSelector((state) => state.netflix?.movies);
const [homeMovie, setHomeMovie] = useState([])


const dispatch = useDispatch();

useEffect(() => {
 
     dispatch(getGenres());
  

}, []);

useEffect(() => {
  if (genresLoaded) dispatch(fetchMovies({ type: "all" }));

}, [genresLoaded]);

useEffect(() => {
  setHomeMovie(movies[Math.floor(Math.random() * movies.length - 1)]);
}, [movies]);


window.onscroll = () => {
  setIsScrolled(window.pageYOffset === 0 ? false : true);
  return () => (window.onscroll = null);
};

function trauncate(string, n) {
  return string?.length > n ? string.substr(0, n - 1) + '...' : string
}







  return (
    <div>
      <Container
        style={{
          backgroundSize: "cover",
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${homeMovie?.image}')`,
          backgroundPosition: "center center",
        }}
      >
        <Navbar isScrolled={isScrolled} />
        <div className="banner-content">
          <h1 className="banner-title">{homeMovie?.name}</h1>
          <div className="banner-buttons">
            <button onClick={() => navigate(`/movie/${homeMovie?.id}`)}>
              Play
            </button>
            <button onClick={() => navigate(`/mylist`)}>My List</button>
          </div>
          <h1 className="banner-description">
            {trauncate(`${homeMovie?.details}`, 150)}
          </h1>
        </div>
        <div className="banner-fadeBottom" />
      </Container>

      <Sliders movies={movies}></Sliders>
    </div>
  );
}


const Container = styled.div`
  position: relative;
  height: 60vh;
  color: white;
  object-fit: contain;
  .banner-content {
    padding-top: 12rem;
    margin-left: 4rem;
    height: 190px;
    .banner-title {
      font-size: 3rem;
      font-weight: 800;
      padding-bottom: 0.3rem;
    }
    .banner-description {
      width: 45rem;
      line-height: 1.3;
      padding-top: 1rem;
      font-size: 0.7rem;
      max-width: 360px;
      height: 80px;
    }
    .banner-buttons {
      button {
        cursor: pointer;
        color: white;
        outline: none;
        border: none;
        font-weight: 700;
        border-radius: 0.2vw;
        padding-left: 2rem;
        padding-right: 2rem;
        margin-right: 1rem;
        padding-top: 0.5rem;
        background-color: rgba(51, 51, 51, 0.5);
        padding-bottom: 0.5rem;
        &:hover {
          color: #000;
          background-color: #e6e6e6;
          transition: all 0.2s;
        }
      }
    }
  }
  .banner-fadeBottom {
    height: 11rem;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    );
  }
`;