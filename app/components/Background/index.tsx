import React from 'react';
import { Reset, FullScreen, Gradient } from './styled';

const Background: React.FC = ({ children }) => {
  return (
    <>
      <Reset />
      <FullScreen>
        {children}
        <Gradient />
      </FullScreen>
    </>
  );
};

export default Background;
