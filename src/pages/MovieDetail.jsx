import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import YouTube from 'react-youtube';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { BsFillStarFill, BsFillSuitHeartFill , BsAlarmFill } from "react-icons/bs";
import {
  fetchSpecificDataBySearch,
  removeSelectedMoviesOrShow
 
} from "../store";
import Loader from './Loader';

export default function MovieDetail() {
 
const navigate = useNavigate();
const dispatch = useDispatch();
const selectMoviesOrShow = useSelector(
  (state) => state.netflix.selectMoviesOrShow
);

const id = useParams()
useEffect(() => {
  dispatch(fetchSpecificDataBySearch({id:id.id}));


 return () => {
  dispatch(removeSelectedMoviesOrShow())
 }



}, [dispatch, id]);




 const renderTrailer = () => {
 
const trailer = selectMoviesOrShow.videos.results.find(
  (vid) => vid.name === "Official Trailer"
);

const teaser = selectMoviesOrShow.videos.results.find(
  (vid) => vid.name === "Official Teaser"
);

const key = trailer ? trailer?.key : teaser?.key

 return (
   <YouTube
     videoId={key}
     style={{
       position: "absolute",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       left: "0",
       right: "2rem",
       top: 0,
       bottom: 0,
     }}
     opts={{
       heigth: "100%",
       width: "100%",
     }}
   />
 );

 }


    console.log(selectMoviesOrShow);
   
  return (
    <>
      {Object.keys(selectMoviesOrShow).length === 0 ? (
        <Loader/>
      ) : (
        <Container
          style={{
            backgroundSize: "cover",
            backgroundImage: `url('https://image.tmdb.org/t/p/original/${selectMoviesOrShow?.backdrop_path}')`,
            backgroundPosition: "center center",
          }}
        >
          <ContainerWrapper>
            <Left>
              <MovieTitle>{selectMoviesOrShow.original_title}</MovieTitle>
              <MovieRating>
                <Rating>
                  Netflix Rating <BsFillStarFill className='about-icon' />:{" "}
                  {selectMoviesOrShow.popularity}
                </Rating>
                <Rating>
                  Netflix Votes <BsFillSuitHeartFill className='about-icon' /> :{" "}
                  {selectMoviesOrShow.vote_count}
                </Rating>
                <Rating>
                  Runtime <BsAlarmFill className='about-icon' /> :{" "}
                  {selectMoviesOrShow.runtime}
                </Rating>
                <Rating>
                  Year <i class="fa-solid fa-calendar"></i> :{" "}
                  {selectMoviesOrShow.release_date}
                </Rating>
              </MovieRating>
              <MoviePlot>{selectMoviesOrShow.overview}</MoviePlot>
              <MovieInfo>
                <div>
                  <span>Genres</span>

                  {selectMoviesOrShow.genres?.map((genre, index) => (
                    <span key={index}>{genre.name}</span>
                  ))}
                </div>
                <div>
                  <span>Languages</span>

                  {selectMoviesOrShow.spoken_languages?.map((genre, index) => (
                    <span key={index}>{genre.name}</span>
                  ))}
                </div>
              </MovieInfo>
            </Left>
            <Right>{selectMoviesOrShow.videos ? renderTrailer() : null}</Right>
          </ContainerWrapper>
        </Container>
      )}
    </>
  );
}



const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 2rem;
 
  color: #e9dfdf;
  font-weight: 400;
  object-fit: contain;
  height: fit-content;
`;

const Left = styled.div`
  min-width: 44vw;
  
  padding: 2rem;
`;


const MovieTitle = styled.div`
font-size: 40px;
color: #ead2d2;
`;


const MovieRating = styled.div`
padding-left: 1rem;
font-size: 0.8rem;
margin-top: 20px;
color: #8e8a8a;
display: flex;

`;


const Rating = styled.span`
  margin-right: 20px;
  .about-icon {
    color: #e84646;
    margin-right: 2px;
  }
  i {
    color: #e84646;
    margin-right: 2px;
  }
`;



const MoviePlot = styled.div`
margin-top: 20px;
line-height: 1.4rem;
`;


const MovieInfo = styled.div`
  div span {
    color: #8e918e;
    margin-right: 2vh;
  }

  div span:first-child {
    padding: 10px 0;
    color: #ffffff;
    font-weight: 600;
    width: 100px;
    display: inline-block;
  }
`;

const Right = styled.div`
  min-width: 45vw;
  height: 90vh;
  position: relative;

`;



const ContainerWrapper = styled.div`
  background: rgba(0, 0, 0, 0.8);
border-radius: 9px;
  backdrop-filter: blur(4px);
  display: flex;
  height: 100%;
  width: 100%;
  height: fit-content;

`;