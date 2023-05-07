import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineLeft } from 'react-icons/ai'
import { AiOutlineRight } from 'react-icons/ai'
import stranger from "../assets/stranger.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Card from './Card'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';


export default function CardSlider({data, title}) {

  const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);
    {console.log("right-arrow")}
    return (
      <Typography onClick={() => scrollPrev()} className="right-arrow">
        <AiOutlineArrowLeft />
      </Typography>
    );
  };
  
  const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);
  
    return (
      <Typography onClick={() => scrollNext()} className="left-arrow">
        <AiOutlineArrowLeft />
      </Typography>
    );
  };


  const [showControls, setShowControls] = useState(false);
  const [sliderPositon, setSliderPositon] = useState(0)
  const listRef = useRef();


  const handleDirection = (direction) => {
    if(listRef.current){
       let distance = listRef.current.getBoundingClientRect().x - 70;
   
   
    if(direction === 'left' && sliderPositon > 0 ) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPositon(sliderPositon - 1)
    }
        if (direction === "right" && sliderPositon < 4) {
          listRef.current.style.transform = `translateX(${-270 + distance}px)`;
          setSliderPositon(sliderPositon + 1);
        } }
  }



  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + data.length) % data.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % data.length);
  };



  return (
    <Container
      className="flex column  scroll_bar"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h2>{title}</h2>
      <div className="wrapper">
        <div className="flex slider"  ref={listRef} >
           {data?.map((movie, index) => {
              return <Card movieData={movie} index={index} key={movie.id} />;
            })}              
        </div>
        {
          showControls && <div className="slider-action left" onClick={() => handleDirection("left")}>
            <AiOutlineLeft/>  
        </div>
        }
       {
         showControls && <div className="slider-action right" onClick={() => handleDirection("right")}>
          <AiOutlineRight/>
        </div>
       }    
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
  padding: 2rem 0;
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
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99;
      height: 100%;
      top: 10px;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
        cursor: pointer;
        background-color: #726d6d;
        border-radius: 50%;    
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


const Typography = styled.div`
height: 20px;
width: 20px;
`;