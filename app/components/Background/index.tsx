import React from 'react';
import { Reset, FullScreen, Gradient } from './styled';

const Background: React.FC = ({ children }) => {
  const [hue, setHue] = React.useState(170);
  const [accelerator, setAccelerator] = React.useState(1);

  setTimeout(() => {
    if (hue > 200 || hue < 160) {
      setAccelerator(accelerator * -1);
    }

    setHue(hue + accelerator);
  }, 450);

  return (
    <>
      <Reset />
      <FullScreen>
        {children}
        <Gradient hue={hue} />
      </FullScreen>
    </>
  );
};

export default Background;
