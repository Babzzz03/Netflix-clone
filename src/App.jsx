import React from 'react'
import Login from './pages/Login' 
import SignUp from "./pages/SignUp"; 
import Netflix from "./pages/Netflix"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Player from './pages/Player';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import UserLiked from './pages/UserLiked';
import SearchPage from './pages/SearchPage';
import MovieDetail from './pages/MovieDetail';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="player" element={<Player />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/tv" element={<TVShows />} />
          <Route exact path="/mylist" element={<UserLiked />} />
          <Route exact path="/search" element={<SearchPage />} />
          <Route exact path="/movie/:id" element={<MovieDetail />} />
          <Route exact path="/" element={<Netflix />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
