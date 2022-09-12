import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import { AiOutlineLeft } from 'react-icons/ai'
import { AiOutlineRight } from "react-icons/ai";
import stranger from "../assets/stranger.jpg";

import Card from './Card'
import Slider from 'react-slick';

export default function CardSlider({data, title}) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };



  const [showControls, setShowControls] = useState(false);
  const [sliderPositon, setSliderPositon] = useState(0)
  const listRef = useRef();


  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if(direction === 'left' && sliderPositon > 0 ) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPositon(sliderPositon - 1)
    }
        if (direction === "right" && sliderPositon < 4) {
          listRef.current.style.transform = `translateX(${-230 + distance}px)`;
          setSliderPositon(sliderPositon + 1);
        }
  }
  return (
    <Container
      className="flex column  scroll_bar"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h2>{title}</h2>
      <div className="wrapper">
       

        <div className="flex slider" >
        
            {data?.map((movie, index) => {
              return <Card movieData={movie} index={index} key={movie.id} />;
            })}
         
        </div>

      
      </div>
    </Container>
  );
}


const Container = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  gap: 1rem;
  position: relative;
  z-index: 1;
  padding: 3rem 0;
  @media (max-width: 670px) {
    padding: 1rem 0;
  }
  h2 {
    margin-left: 20px;
    font-size: 2rem;
    @media (max-width: 670px) {
      margin-left: 14px;
      font-size: 1.3rem;
    }
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;

      margin-left: 50px;
      @media (max-width: 670px) {
        margin-left: 10px;
      }
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
        cursor: pointer;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`;