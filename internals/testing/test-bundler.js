import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// 'react-slick' polyfill
window.matchMedia =
  window.matchMedia ||
  function mM() {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  };
