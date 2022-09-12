import React from 'react'
import styled from 'styled-components';
import logo from "../assets/netflix-logo.png";

const Footer = () => {
  return (
    <Container>
      <Logo>
        <img src={logo} alt="" />
      </Logo>
      <p>Clone Made with ❤️ by Babzz</p>
    </Container>
  );
}

export default Footer


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: black;
  height: 80px;
  p{
    @media (max-width: 744px) {
  
    font-size: 12px;
  } 
  }
 
`;

const Logo = styled.div`
  img {
    height: 20px;
    padding-right: 10px;
    @media (max-width: 744px) {
      height: 14px;
    }
  }
`;