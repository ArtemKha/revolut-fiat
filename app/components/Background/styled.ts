import styled, { createGlobalStyle } from 'styled-components';

export const Reset = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`;

export const FullScreen = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const Gradient = styled.div`
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 45s ease infinite;
  height: 100%;
  width: 100%;

  @keyframes gradientBG {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
