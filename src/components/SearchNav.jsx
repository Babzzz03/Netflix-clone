import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/netflix-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";
import SearchPage from "../pages/SearchPage";
import { fetchDataBySearch } from "../store";
import { useDispatch, useSelector } from "react-redux";
export default function SearchNav({ isScrolled }) {
  const navigate = useNavigate();
  const links = [
    { name: "Home", link: "/" },
    { name: "Tv Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  // onAuthStateChanged(firebaseAuth, (currentUser) => {
  //   if (!currentUser) navigate("/login");
  // });

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [searchKeyClicked, setSearchKeyClicked] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchMovie, setSearchMovie] = useState([]);

  const genresLoaded = useSelector((state) => state.netflix.genres);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  const dispatch = useDispatch();

  const searchMovies = (e) => {
    e.preventDefault();
   searchKey && dispatch(fetchDataBySearch({ searchKey }));

    
  };

  console.log(movies);
  console.log(searchKey);

  return (
    <Container>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <form
            className={`search ${showSearch ? "show-search" : ""} `}
            onSubmit={searchMovies}
          >
            <button
              type={"submit"}
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              value={searchKey}
              onMouseEnter={() => {
                setInputHover(true);
                setShowSearch(true);
              }}
              onMouseLeave={() => setInputHover(false)}
              onClick={() => setShowSearch(true)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </form>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  z-index: 1000;

  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 13vh;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    @media (max-width: 60em) {
      height: 19vh;
      top: -4vh;
    }
    @media (max-width: 40em) {
      height: 18vh;
      top: -5vh;
    }
    @media (max-width: 30em) {
      padding: 0 1rem;
    }

    .left {
      gap: 2rem;
      .brand {
        img {
          height: 2rem;
          @media (max-width: 60em) {
            height: 1.5rem;
          }
          @media (max-width: 40em) {
            height: 1.1rem;
          }
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;

        @media (max-width: 60em) {
          position: absolute;
          top: 13vh;
          display: flex;
          font-size: 1rem;
          justify-content: center;
          align-items: center;
          width: 88%;
        }

        @media (max-width: 40em) {
          top: 13vh;

          font-size: 0.9rem;

          width: 84%;
        }
        @media (max-width: 30em) {
          width: 87%;
        }

        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
          @media (max-width: 40em) {
            font-size: 1rem;
          }
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;

          svg {
            color: white;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;

          @media (max-width: 40em) {
            padding: 0.1rem;
          }
        }
      }
    }
  }

  .search-movie-component {
    position: fixed;
    z-index: 700;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;
