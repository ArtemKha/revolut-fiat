export interface SliderMethods {
  slickNext: () => void;
  slickPause: () => void;
  slickPlay: () => void;
  slickPrev: () => void;
  slickGoTo: (slideNumber: number, dontAnimate?: boolean) => void;
}
