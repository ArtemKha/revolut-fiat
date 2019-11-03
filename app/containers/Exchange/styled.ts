import styled, { css } from 'styled-components';

const triangleSize = '15px';
const fadedBorder = css`
  content: '';
  display: block;
  position: absolute;
  top: -${triangleSize};
  width: 50%;
  min-height: ${triangleSize};
  border-bottom: ${triangleSize} solid rgba(0, 0, 0, 0.08);
`;

interface CurrencyExchangeTabProps {
  isTop: boolean;
}
export const CurrencyExchangeTab = styled.div<CurrencyExchangeTabProps>`
  flex: 1;
  display: flex;
  height: 250px;
  color: #fff;

  ${props =>
    !props.isTop &&
    css`
      position: relative;
      background-color: rgba(0, 0, 0, 0.08);
      margin-top: ${triangleSize};
      margin-bottom: ${triangleSize};

      &:after {
        ${fadedBorder}
        right: 0;
        margin-left: 50%;
        border-left: 5vw solid transparent;
      }

      &:before {
        ${fadedBorder}
        left: 0;
        border-right: 5vw solid transparent;
      }
    `}

  .slick-initialized {
    margin-top: auto;
    margin-bottom: auto;
    width: 800px;
    max-width: 100vw;
  }

  .slick-dots li button:before,
  .slick-dots li.slick-active button:before {
    color: #fff;
    font-size: 8px;
  }

  @media screen and (min-width: 800px) {
    background-color: transparent;

    &:after,
    &:before {
      border-bottom: none;
    }
`;

export const Centered = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;

  @media screen and (min-width: 800px) {
    left: calc(50% - 400px);
    max-width: 800px;
    border-radius: 20px;
  }
`;
