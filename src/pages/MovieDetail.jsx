import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import YouTube from 'react-youtube';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { BsFillStarFill, BsFillSuitHeartFill , BsAlarmFill } from "react-icons/bs";
import {
  fetchCrew,
  fetchSpecificDataBySearch,
  removeSelectedCrew,
  removeSelectedMoviesOrShow
 
} from "../store";
import Loader from './Loader';
import CircleRating from './CircleRating';
import dayjs from 'dayjs';

export default function MovieDetail() {
 
const navigate = useNavigate();
const dispatch = useDispatch();
const selectMoviesOrShow = useSelector(
  (state) => state.netflix.selectMoviesOrShow
);

const selectCrews = useSelector(
  (state) => state.netflix.selectCrew
);

const id = useParams()
useEffect(() => {
  dispatch(fetchSpecificDataBySearch({id:id.id}));
 return () => {
  dispatch(removeSelectedMoviesOrShow())
 }
}, [dispatch, id]);


useEffect(() => {
  dispatch(fetchCrew({id:id.id}))

  return () => {
    dispatch(removeSelectedCrew())
  }
}, [dispatch, id])



 const [isScrolled, setIsScrolled] = useState(false);
 window.onscroll = () => {
   setIsScrolled(window.pageYOffset === 0 ? false : true);
   return () => (window.onscroll = null);
 };


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
     className='youtube-video'
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


    
    const director = selectCrews?.crew?.filter((f) => f.job === "Director");
    const writer = selectCrews?.crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    console.log(director);
    console.log(writer);
    const toHoursAndMinutes = (totalMinutes) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
   
  return (
    <>
      <Navbar isScrolled={isScrolled} />
      {Object.keys(selectMoviesOrShow).length === 0 ? (
        <Loader />
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
              <MovieTitle>{selectMoviesOrShow.title}</MovieTitle>
              <MovieRating>
              {selectMoviesOrShow.genres?.map((genre, index) => (
                    <span key={index}>{genre.name}</span>
                  ))}
<div className="circler_rating">
  <CircleRating rating={selectMoviesOrShow.vote_average.toFixed(1)} />
</div>

                {/* <Rating>
                  Netflix Rating <BsFillStarFill className="about-icon" />:{" "}
                  {selectMoviesOrShow.popularity}
                </Rating>
                <Rating>
                  Netflix Votes <BsFillSuitHeartFill className="about-icon" /> :{" "}
                  <CircleRating rating={selectMoviesOrShow.vote_average.toFixed(1)} />
                </Rating>
                <Rating>
                  Runtime <BsAlarmFill className="about-icon" /> :{" "}
                  {selectMoviesOrShow.runtime}
                </Rating>
                <Rating>
                  Year <i class="fa-solid fa-calendar"></i> :{" "}
                  {selectMoviesOrShow.release_date}
                </Rating> */}
              </MovieRating>
              <h6>Overview</h6>
              <MoviePlot>{selectMoviesOrShow.overview}</MoviePlot>
              <MovieInfo>
              <div  className='border-bottom'>
                  <span className='tag' >Status:</span>
                  
                    <span>{selectMoviesOrShow.status}</span>
                    <span className='tag' >Release Date:</span>
                    <span>{dayjs(selectMoviesOrShow.release_date).format("MMM D, YYYY")}</span>
                    <span  className='tag' >Runtime</span> 
                    <span>{toHoursAndMinutes(selectMoviesOrShow.runtime)}</span>
                </div>
                <div className='border-bottom'>
                  <span className='tag' >Director:</span>
                     {director?.length > 0 && (
                        <span className="text">
                        {director?.map((d, i) => (
                            <span key={i}>
                                {d.name}
                                {director.length -
                                    1 !==
                                    i && ", "}
                            </span>
                        ))}
                    </span>
                     )}
                  
                                            
                  
                </div>
                <div  className='border-bottom'>
                  <span  className='tag' >Writers:</span>
                  {writer?.map((d, i) => (<span key={i}>{d.name}{writer.length -1 != i && ", "}</span>))}
                </div>
              </MovieInfo>
            </Left>
            <Right>{selectMoviesOrShow.videos ? renderTrailer() : null}</Right>
            <ButtomGradiant> </ButtomGradiant>
          </ContainerWrapper>
        </Container>
      )}
    </>
  );
}



const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  
  color: #e9dfdf;
  font-weight: 400;
  object-fit: contain;
  height: fit-content;
  @media (max-width: 744px) {
    padding: 0rem;
  }
  .youtube-video {
    @media (max-width: 744px) {
      left: 1rem !important;
      right: 1rem !important;
      top: 0;
    }
  }
`;

const ContainerWrapper = styled.div`
background: rgb(0,0,0);
background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5776435574229692) 35%, rgba(0,0,0,0) 100%);
  border-radius: 9px;
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  height: fit-content;
  @media (max-width: 744px) {
    flex-direction: column;
    border-radius: 0px;
  }
`;

const Left = styled.div`

  min-width: 44vw;
margin-top: 40px;
  padding: 2rem;
  @media (max-width: 744px) {
    min-width: 94vw;
    padding: 1rem;
    padding-top: 6rem;
  }
  h6{
    margin-top: 14px;
   
    font-size: 27px;
    font-weight: 400;
  }
`;


const MovieTitle = styled.div`
  margin-top: 20px;
  font-size: 40px;
  font-weight: 700;
  color: #f3e9e9;
  @media (max-width: 744px) {
    font-size: 24px;
  }
`;


const MovieRating = styled.div`
  padding-left: 1rem;
  font-size: 0.8rem;
  margin-top: 20px;
  color: #8e8a8a;
  display: flex;
  justify-content: space-between;
  width: 70%;
  position: relative;
  .circler_rating{
position: absolute;
top: -20px;
right: -100px;
width: 70px;
  }
  span{
    background-color: #c23535;
    color: white;
    padding: 4px 14px;
    border-radius: 4px;
  }
  @media (max-width: 744px) {
    font-size: 0.6rem;
    padding-left: 0rem;
  }
`;


const Rating = styled.span`
  margin-right: 17px;
  @media (max-width: 744px) {
    margin-right: 5px;
  }
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
  @media (max-width: 744px) {
 
    font-size: 13px;
  }
`;


const MovieInfo = styled.div`
  div span {
    color: #8e918e;
    margin-right: 2vh;
    @media (max-width: 744px) {
      margin-right: 0.7vh;
      font-size: 13px;
    }

   
  }
  .border-bottom {
      border-bottom: 1px solid #696666;
    }

  .tag {
    padding: 10px 0;
    color: #ffffff;
    font-weight: 600;
    width: 100px;
    display: inline-block;
    @media (max-width: 744px) {
      width: 70px;
      font-size: 13px;
    }
  }
`;

const Right = styled.div`
  min-width: 45vw;
  height: 90vh;
  position: relative;

`;

const ButtomGradiant = styled.div`
position: absolute;
bottom: 0;
height: 70px;
width: 100vw;
background: rgb(0,0,0);
background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5776435574229692) 61%, rgba(0,0,0,0.9922093837535014) 100%);
z-index: 100;
`;



