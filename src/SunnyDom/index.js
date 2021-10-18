/*
 ** Communicate With RealDom
 */

import render from './render.js';
import createDomNode from './createDomNode.js';
import diff from './diff.js';
import findDomNode from './findDomNode.js';

const SunnyDom = {
  render,
  createDomNode,
  diff,
  findDomNode,
};

export default SunnyDom;
export { render, createDomNode, diff, findDomNode };
