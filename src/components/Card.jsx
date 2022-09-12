import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import video from "../assets/demo.mp4";
import { useDispatch, useSelector } from "react-redux";
import { IoPlayCircleSharp } from 'react-icons/io5';
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import {AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import { fetchSpecificDataBySearch, removeFromLikedMovies } from '../store';
import Slider from "react-slick";

export default function Card({movieData, isLiked = false}) {
const [isHovered, setIsHovered] = useState(false);
const [email, setEmail] = useState(undefined)
const navigate = useNavigate();
    const dispatch = useDispatch();

 onAuthStateChanged(firebaseAuth, (currentUser) => {
   if (currentUser) setEmail(currentUser.email);
   else navigate('/login')
 });

 const addToList = async () => {
  try {
await axios.post('http://localhost:5000/api/user/add', { email, data:movieData })
  } catch(err){

  }



 }

let id = movieData.id;

 var settings = {
   dots: false,
   infinite: true,
   speed: 500,
   slidesToShow: 4,
   slidesToScroll: 2,
 };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie"
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie"
              onClick={() => navigate(`/movie/${movieData.id}`)}
            />
          </div>
          <div className="info-container flex column">
            <h3
              className="name"
              onClick={() => navigate(`/movie/${movieData.id}`)}
            >
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="play"
                  onClick={() => navigate(`/movie/${movieData.id}`)}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck
                    title="Remove From List"
                    onClick={() =>
                      dispatch(
                        removeFromLikedMovies({
                          movieId: movieData.id,
                          email,
                        })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}


const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  @media (max-width: 670px) {
    max-width: 190px;
    width: 190px;
  }
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;

    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -14vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    @media (max-width: 790px) {
      width: 14rem;
      top: -4vh;
    }
    .image-video-container {
      position: relative;

      height: 140px;
      @media (max-width: 790px) {
        height: 90px;
      }
      img {
        width: 100%;
        height: 140px;

        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
        @media (max-width: 790px) {
          height: 90px;
        }
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
      @media (max-width: 790px) {
        padding: 0.4rem;
        gap: 0.1rem;
      }
      h3 {
        font-size: 1rem;
        @media (max-width: 790px) {
          font-size: 0.7rem;
        }
      }
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
        @media (max-width: 790px) {
          gap: 0.7rem;
        }
      }
      svg {
        font-size: 1.4rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        @media (max-width: 790px) {
          font-size: 0.8rem;
        }
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        @media (max-width: 790px) {
          gap: 0.4rem;
        }
        li {
          padding-right: 0.7rem;
          font-size: 0.8rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;