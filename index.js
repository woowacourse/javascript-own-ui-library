import ShinseDOM from './shinse/shinseDOM.js';
import { getCounterNodeObj } from './counter/counter.js';

const rootElementId = 'root';

ShinseDOM.render(getCounterNodeObj, rootElementId);
