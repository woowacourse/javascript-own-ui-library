import Sun from '../Sun/index.js';
import App from './App.js';

const $root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  Sun.render(App(), $root);
});
