import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';

export default function TVShows() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const genresLoaded = useSelector((state) => state.netflix.genres);
    const movies = useSelector((state) => state.netflix.movies);
        const genres = useSelector((state) => state.netflix.genres);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getGenres());
    }, []);

    useEffect(() => {
      if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
    }, [genresLoaded]);

    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };

 onAuthStateChanged(firebaseAuth, (currentUser) => {

 });


  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}


const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
        text-align: center;
        color: white;
        margin-top: 4rem;
    }
  }  
`