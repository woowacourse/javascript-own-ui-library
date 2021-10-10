import { RootNode, Node, TextNode } from './class.js';

const removeLineBreaks = (str) => str.replace(/(\r\n|\n|\r)/gm, '');

/* @params attributesToBeParsed : ['class="container"'] */
/* @return attributes : [['class', 'container']] */
const parseAttributes = (attributesToBeParsed) => {
  return attributesToBeParsed.map((v) => {
    let [key, value] = v.split('=');
    if (!value) {
      value = true;
    } else {
      value = value.replace(/"/g, '');
    }
    return [key, value];
  });
};

const isOpeningTag = (t, index) => t[index] === '<' && t[index + 1] !== '/';

const getIndexOfClosingBracket = (t, indexOpeningTagStart) => {
  let indexClosingBracket = indexOpeningTagStart;

  while (t[indexClosingBracket] !== '>') {
    indexClosingBracket++;
  }
  return indexClosingBracket;
};

const getIndexOfTextEnd = (t, indexOfTextStart) => {
  let indexTextEnd = indexOfTextStart;

  while (t[indexTextEnd] !== '<' && indexTextEnd < t.length) {
    indexTextEnd++;
  }
  return indexTextEnd - 1;
};

const getIndexOfClosingTag = (t, tagName, indexOpeningTagStart) => {
  const openingTag = `<${tagName}`;
  const closingTag = `</${tagName}>`;
  const openingIndexes = [...t.matchAll(new RegExp(openingTag, 'gi'))].map((v) => v.index);
  const closingIndexes = [...t.matchAll(new RegExp(closingTag, 'gi'))].map((v) => v.index);
  let op = 0;
  let cp = 0;
  let accCount = 0;

  for (let i = 0; i < t.length; i++) {
    if (i === openingIndexes[op]) {
      accCount += 1;
      op++;
    } else if (i === closingIndexes[cp]) {
      accCount -= 1;

      if (i > indexOpeningTagStart && accCount === 0) {
        return closingIndexes[cp];
      }
      cp++;
    }
  }
  return closingIndexes.slice(-1)[0];
};

const getNodeInfo = (t, indexStart) => {
  const indexOpeningTagEnd = getIndexOfClosingBracket(t, indexStart);
  const chunk = t.slice(indexStart + 1, indexOpeningTagEnd);
  const [tagName, ...attributesToBeParsed] = chunk.split(' ');
  const attributes = parseAttributes(attributesToBeParsed);
  const indexClosingTagStart = getIndexOfClosingTag(t, tagName, indexStart);
  const indexClosingTagEnd = indexClosingTagStart + `/${tagName}>`.length;
  const childrenTemplate = t.slice(indexOpeningTagEnd + 1, indexClosingTagStart);

  return { tagName, attributes, indexClosingTagEnd, childrenTemplate };
};

const getTextNodeInfo = (t, indexStart) => {
  const indexTextEnd = getIndexOfTextEnd(t, indexStart);
  const value = t.slice(indexStart, indexTextEnd + 1);

  return { value: value.trim(), indexTextEnd };
};

/* @params template : string */
/* @params parent : RootNode | TextNode */
/* @return parent : RootNode | TextNode (children updated) */
export const parse = (template, parent) => {
  if (!parent) {
    parent = new RootNode();
  }
  const t = removeLineBreaks(template);
  let indexStart = 0;

  while (indexStart < t.length) {
    if (isOpeningTag(t, indexStart)) {
      const { tagName, attributes, indexClosingTagEnd, childrenTemplate } = getNodeInfo(t, indexStart);
      const node = new Node(tagName, attributes);

      parent.append(node);
      parse(childrenTemplate, node);
      indexStart = indexClosingTagEnd + 1;
    } else {
      const { value, indexTextEnd } = getTextNodeInfo(t, indexStart);

      if (value.length > 0) {
        const node = new TextNode(value);
        parent.append(node);
      }
      indexStart = indexTextEnd + 1;
    }
  }
  return parent;
};
