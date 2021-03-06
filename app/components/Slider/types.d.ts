import { ActionType } from 'typesafe-actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */

interface HomeState {
  readonly username: string;
}

/* --- ACTIONS --- */

/* --- EXPORTS --- */

export interface SlickConfig {
  className?: any;
  accessibility?: any;
  adaptiveHeight?: any;
  arrows?: any;
  autoplay?: any;
  autoplaySpeed?: any;
  centerMode?: any;
  centerPadding?: any;
  cssEase?: any;
  customPaging?: () => void;
  dots?: any;
  dotsClass?: any;
  draggable?: any;
  easing?: any;
  edgeFriction?: any;
  fade?: any;
  focusOnSelect?: any;
  infinite?: any;
  initialSlide?: any;
  lazyLoad?: any;
  pauseOnHover?: any;
  responsive?: any;
  rtl?: any;
  slide?: any;
  slidesToShow?: any;
  slidesToScroll?: any;
  speed?: any;
  swipe?: any;
  swipeToSlide?: any;
  touchMove?: any;
  touchThreshold?: any;
  useCSS?: any;
  variableWidth?: any;
  vertical?: any;
  waitForAnimate?: any;
  afterChange?: any;
  beforeChange?: any;
  edgeEvent?: any;
  init?: any;
  swipeEvent?: any;
  // nextArrow, prevArrow are react componets
  nextArrow?: any;
  prevArrow?: any;
}
