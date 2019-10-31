import React from 'react';
import { Reset, FullScreen, Centered, Text, Gradient } from './styled';

export default function Background({ children }): React.ComponentProps {
  const [hue, setHue] = React.useState(240);
  const [accelerator, setAccelerator] = React.useState(1);

  setTimeout(() => {
    if (hue > 240) {
      setAccelerator(-1);
    }
    if (hue < 180) {
      setAccelerator(1);
    }
    setHue(hue + accelerator);
  }, 2350);

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
