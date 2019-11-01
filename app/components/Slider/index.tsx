import React from 'react';
import Slick from 'react-slick';
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

interface Props {
  settings?: SlickConfig;
}
const Slider: React.FC<Props> = ({ settings = initial, children }) => {
  return (
    <Slick {...initial} {...settings}>
      {children}
    </Slick>
  );
};

export default Slider;
