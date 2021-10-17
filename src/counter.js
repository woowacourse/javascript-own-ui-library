import { minus, plus, reset } from '../src/utils.js';

export const createCounterDocumentObject = () => {
  const state = { value: 0 };

  return {
    tagName: 'div',
    attributes: [{ class: 'container' }],
    children: [
      {
        tagName: 'span',
        attributes: [{ class: 'count' }],
        innerText: state.value,
      },
      {
        tagName: 'div',
        attributes: [{ class: 'btn-group' }],
        children: [
          {
            tagName: 'button',
            attributes: [{ click: () => minus(state) }],
            children: [{ tagName: 'strong', attributes: [], innerText: '-' }],
          },
          {
            tagName: 'button',
            attributes: [{ click: () => reset(state) }],
            children: [{ tagName: 'strong', attributes: [], innerText: 'RESET' }],
          },
          {
            tagName: 'button',
            attributes: [{ click: () => plus(state) }],
            children: [{ tagName: 'strong', attributes: [], innerText: '+' }],
          },
        ],
      },
    ],
  };
};
