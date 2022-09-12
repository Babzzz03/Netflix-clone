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
                <button onClick={() => setShowPassword(true)}>
                  Get Started
                </button>
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
          @media (max-width: 1044px) {
            padding: 0 17rem;
            text-align: center;
          }
          @media (max-width: 980px) {
            padding: 0 10rem;
          }
          @media (max-width: 680px) {
            padding: 0 6rem;
          }
          @media (max-width: 580px) {
            padding: 0 4rem;
          }

          @media (max-width: 480px) {
            padding: 0 1rem;

            font-size: 27px;
          }
          @media (max-width: 394px) {
            padding: 0 0.7rem;

            font-size: 27px;
          }
          @media (max-width: 360px) {
            padding: 0 0.4rem;
            padding: 0;
            font-size: 25px;
          }
        }
        h4 {
          @media (max-width: 480px) {
            font-size: 15px;
          }
          @media (max-width: 394px) {
            font-size: 14px;
          }
        }
        h6 {
          @media (max-width: 480px) {
            font-size: 12px;
          }
          @media (max-width: 394px) {
            font-size: 11px;
            text-align: center;
          }
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        @media (max-width: 940px) {
          grid-template-columns: ${({ showPassword }) =>
            showPassword ? "1fr " : "2fr "};
          gap: 10px;
        }
        @media (max-width: 740px) {
          grid-template-columns: ${({ showPassword }) =>
            showPassword ? "1fr " : "2fr "};
          gap: 10px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          width: 60%;
        }
        @media (max-width: 480px) {
          width: 80%;
        }
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
          @media (max-width: 740px) {
            padding: 0.7rem 1rem;
            width: 90%;
          }
          @media (max-width: 480px) {
            padding: 0.5rem 1rem;
            width: 100%;
            font-size: 0.8rem;
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
          @media (max-width: 480px) {
            font-size: 0.9rem;
          }
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
        @media (max-width: 480px) {
          font-size: 0.8rem;
        }
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