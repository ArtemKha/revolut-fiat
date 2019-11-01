import React from 'react';
import { Reset, FullScreen, Centered, Text, Gradient } from './styled';

export default function Background({ children }): React.ComponentProps {
  const [hue, setHue] = React.useState(170);
  const [accelerator, setAccelerator] = React.useState(1);

  setTimeout(() => {
    if (hue > 200) {
      setAccelerator(-1);
    }
    if (hue < 160) {
      setAccelerator(1);
    }
    setHue(hue + accelerator);
  }, 250);

  return (
    <>
      <Reset />
      <FullScreen>
        {children}
        <Gradient hue={hue} />
      </FullScreen>
    </>
  );
}
