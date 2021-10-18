import ShinseDOM from './shinse/shinseDOM.js';
import { getCounterNodeObj } from './counter/counter.js';

const rootElementId = 'root';

let count = 0;

ShinseDOM.render(getCounterNodeObj(count), rootElementId);

const handleCounterButtons = (e) => {
	const buttonId = e.target.id;

	count = buttonId === 'minus-button' ? count - 1 : buttonId === 'plus-button' ? count + 1 : 0;

	ShinseDOM.render(getCounterNodeObj(count), rootElementId);
	addEventToCounterButtons(count);
};

const addEventToCounterButtons = () => {
	const counterButtons = document.querySelector('.btn-group');
	counterButtons.addEventListener('click', (e) => handleCounterButtons(e));
};

addEventToCounterButtons(count);
