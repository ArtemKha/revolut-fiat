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

interface GradientProps {
  readonly hue: number;
}
export const Gradient = styled.div<GradientProps>`
  background: linear-gradient(
    20deg,
    hsl(${props => props.hue}, 60%, 65%),
    hsl(${props => props.hue - 305}, 64%, 60%)
  );
  height: 100%;
  width: 100%;
`;
