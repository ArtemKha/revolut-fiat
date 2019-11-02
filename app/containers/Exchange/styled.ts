import styled from 'styled-components';

export const CurrencyExchangeTab = styled.div`
  flex: 1;
  height: 250px;
  color: #fff;

  .slick-initialized {
    max-width: 100vw;
  }

  .slick-dots li button:before,
  .slick-dots li.slick-active button:before {
    color: #fff;
    font-size: 12px;
  }
`;

export const Centered = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  /* transform: translateX(-0%) translateY(-0%); */
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  height: 100vh;
`;

// export const Text = styled.h1`
//   color: white;
//   font-family: sans-serif;
//   margin-bottom: 16px;
// `;

// export const Control = styled.div`
//   flex-basis: 85px;
//   text-align: center;
//   position: relative;
//   cursor: pointer;
//   font-size: 12px;
//   display: flex;
//   justify-content: space-around;
//   flex-direction: column;
//   color: #fff;
// `;

// export const ControlLabel = styled.div`
//   position: absolute;
//   bottom: -25px;
//   left: 0;
//   text-align: center;
//   width: 100%;
//   opacity: 0.6;
// `;

// export const ControlIcon = styled.div`
//   transition: transform 0.5s ease;

//   :hover {
//     transform: rotate(180deg);
//   }
// `;
