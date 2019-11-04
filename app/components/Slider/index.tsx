import React, { RefObject } from 'react';
import Slick, { Settings } from 'react-slick';
import { SlickConfig } from './types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const initial = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
interface Props extends Settings {
  refToUse: any;
}
const Slider: React.FC<Props> = ({ refToUse, children, ...rest }) => {
  return (
    <Slick ref={refToUse} {...initial} {...rest}>
      {children}
    </Slick>
  );
};

export default Slider;
