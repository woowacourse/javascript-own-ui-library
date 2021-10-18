import createElement from './createElement.js';

const parseDomElement = (element) => {
  const parsedElement = createElement(element.tagName, {
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
