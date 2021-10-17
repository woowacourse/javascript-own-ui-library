/**
 * @param {Node} currentElem
 * @param {Object[]} attrs
 * @param {String} attrs[].class
 */
const makeAttributes = (currentElem, attrs) => {
  attrs.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'string') {
        currentElem.setAttribute(key, value);
      } else if (typeof value === 'function') {
        currentElem.addEventListener(key, value);
      }
    });
  });
};

/**
 * @param {Object[]} children
 * @param {String} children[].tagName
 * @param {Object[]} children[].attributes
 * @param {String} children[].attributes.class
 * @param {Object[]} children[].children
 */
const makeChildren = (parentElem, children) => {
  const fragment = document.createDocumentFragment();

  children.forEach((child) => {
    fragment.append(createCounterDOM(child));
  });

  parentElem.appendChild(fragment);
};

/**
 * @param {Node} parentElem
 * @param {String} textValue
 */
const makeInnerText = (parentElem, textValue) => {
  parentElem.textContent = textValue;
};

/**
 * @param {Object} elem
 */
export const createCounterDOM = (elem) => {
  const fragment = document.createDocumentFragment();
  let outerElement;

  Object.entries(elem).forEach(([key, value]) => {
    if (key === 'tagName') {
      outerElement = document.createElement(value);
      fragment.appendChild(outerElement);
    }

    if (key === 'attributes') {
      makeAttributes(outerElement, value);
    }

    if (key === 'children') {
      makeChildren(outerElement, value);
    }

    if (key === 'innerText') {
      makeInnerText(outerElement, value);

      return;
    }

    fragment.appendChild(outerElement);
  });

  return fragment;
};
