import React from 'react'
import styled from 'styled-components';

export default function BackgroudImage() {
  return (
    <Container>
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/701eec50-4b87-4dc0-9d00-b0f54025dc36/67801b27-84a3-484f-9805-0b2ce73305a2/NG-en-20220905-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="background"
      />
    </Container>
  );
}


const Container = styled.div`

height: 100vh;
width: 100vw;
img{
    height: 100vh;
    width: 100vw;

    object-fit: cover;

}

`