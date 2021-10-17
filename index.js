import { $ } from './src/utils.js';
import { createCounterDOM } from './src/renderer.js';
import { createCounterDocumentObject } from './src/counter.js';

const counter = createCounterDocumentObject();
const virtualDocument = createCounterDOM(counter);
$('#root').appendChild(virtualDocument);
