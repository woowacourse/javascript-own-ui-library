import Sunny from './src/Sunny.js';
import SunnyDom from './src/SunnyDom.js';

const App = () => {
  return Sunny.createElement('div', {
    class: 'container',
    children: [
      Sunny.createElement('span', { class: 'count', textContent: '0' }),
      Sunny.createElement('div', {
        class: 'btn-group',
        children: [
          Sunny.createElement('button', { children: [Sunny.createElement('strong', { textContent: '-' })] }),
          Sunny.createElement('button', { children: [Sunny.createElement('strong', { textContent: 'RESET' })] }),
          Sunny.createElement('button', { children: [Sunny.createElement('strong', { textContent: '+' })] }),
        ],
      }),
    ],
  });
};

window.onload = () => {
  const $root = document.querySelector('#root');

  /* 돔 파서 */
  const parsedRoot = Sunny.parseDomElement($root);

  console.log(parsedRoot);

  const element = Sunny.createElement('button', {
    id: 'something-id',
    class: 'something-class',
    textContent: 'click',
  });

  const element2 = Sunny.createElement('span', {
    id: 'something-id2',
    class: 'something-class2',
    textContent: '&No',
  });

  element.appendChild(element2);

  element.addEventListener('click', () => {
    console.log('hello');
  });

  console.dir($root);

  SunnyDom.render(App(), $root);
};
