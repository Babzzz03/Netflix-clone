import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import BackgroudImage from '../components/BackgroudImage'
import Header from '../components/Header'
import { firebaseAuth } from '../utils/firebase-config';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

const handleSignIn = async () => {
    try {
       const {email, password} = formValues;
       await createUserWithEmailAndPassword(firebaseAuth,email, password)
    } catch (error) {
         console.log(error);
    }
};

onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate('/');
}


)


  return (
    <Container showPassword={showPassword}>
      <BackgroudImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}

            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          <button onClick={handleSignIn}>Sign Up</button>
        </div>
      </div>
    </Container>
  );
}


const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        align-items: center;
        font-size: calc(0.8rem + 1vw);
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
grid-template-columns: ${({showPassword}) => showPassword ?  "1fr 1fr" : "2fr 1fr" };
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1rem;
          font-size: 1rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
  
          font-weight: bolder;
          font-size: 1.05rem;
          transition: 0.5s ease;
        }
        button:hover {
          transform: scale(1.1);
        }
        button:active {
          transform: scale(0.9);
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;

        font-weight: bolder;
        font-size: 1.05rem;
        transition: 0.5s ease;
      }
      button:hover {
        transform: scale(1.1);
      }
      button:active {
        transform: scale(0.9);
      }
    }
  }
`;