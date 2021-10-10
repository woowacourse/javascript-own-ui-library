import SunnyDom from './src/SunnyDom.js';
import App from './src/App.js';

window.onload = () => {
  const $root = document.querySelector('#root');

  SunnyDom.render(App(), $root);
};
