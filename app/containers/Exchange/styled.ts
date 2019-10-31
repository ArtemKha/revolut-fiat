import styled from 'styled-components';

export const Centered = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Text = styled.h1`
  color: white;
  font-family: sans-serif;
  margin-bottom: 16px;
`;
