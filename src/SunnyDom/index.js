/*
 ** Communicate With RealDom
 */

import render from './render.js';
import createDomNode from './createDomNode.js';
import diff from './diff.js';
import findDomNode from './findDomNode.js';
import stateManager from './stateManager.js';

const SunnyDom = {
  render,
  createDomNode,
  diff,
  findDomNode,
  stateManager,
};

export default SunnyDom;
export { render, createDomNode, diff, findDomNode, stateManager };
