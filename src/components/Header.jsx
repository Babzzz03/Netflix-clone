import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import logo from '../assets/netflix-logo.png'
export default function Header(props) {
  
  const navigate = useNavigate()
    return (
  <Container className='flex a-center j-between' >
    <div className="logo"    onClick={() => {navigate("/")}} >
        <img src={logo} alt="logo" />
    </div>
    <button onClick={() => navigate(props.login? '/login' : '/signup')} >
        {props.login ? 'Log In' : 'Sign In'}
    </button>
  </Container>
  );
}


const Container = styled.div`
  padding: 1rem 2rem;

  .logo {
    img {
      height: 2rem;
      @media (max-width: 744px) {
        height: 1.2rem;
      }
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
    transition: 0.5s ease;
    @media (max-width: 744px) {
      padding: 0.3rem 0.7rem;
      font-size: 0.9rem;
    }
  }
  button:hover {
    transform: scale(1.1);
  }
  button:active {
    transform: scale(0.9);
  }
`;
