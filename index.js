import SunnyDom from './src/SunnyDom/index.js';
import App from './src/App.js';

window.onload = () => {
  const $root = document.querySelector('#root');

  SunnyDom.render(App(), $root);
};
