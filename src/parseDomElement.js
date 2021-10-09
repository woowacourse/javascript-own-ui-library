import Sunny from './Sunny.js';

const parseDomElement = (element) => {
  const parsedElement = Sunny.createElement(element.tagName, {
    id: element.id,
    class: element.className,
    textContent: element.textContent,
  });

  if (element.children.length) {
    [...element.children].forEach((child) => {
      parsedElement.appendChild(parseDomElement(child));
    });
  }

  return parsedElement;
};

export default parseDomElement;
