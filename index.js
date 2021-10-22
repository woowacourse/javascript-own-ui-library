import ShinseDOM from './shinse/shinseDOM.js';
import { getCounterNodeObj } from './counter/counter.js';

const rootElementId = 'root';

let count = 0;

ShinseDOM.render(getCounterNodeObj(count), rootElementId);

const updateDOM = () => {
	ShinseDOM.render(getCounterNodeObj(count), rootElementId);
	addEventToCounterButtons();
};

const handleMinusButton = () => {
	count -= 1;
	updateDOM();
};

const handleResetButton = () => {
	count = 0;
	updateDOM();
};

const handlePlusButton = () => {
	count += 1;
	updateDOM();
};

const addEventToCounterButtons = () => {
	const minusButton = document.getElementById('minus-button');
	const resetButton = document.getElementById('reset-button');
	const plusButton = document.getElementById('plus-button');

	minusButton.addEventListener('click', handleMinusButton);
	resetButton.addEventListener('click', handleResetButton);
	plusButton.addEventListener('click', handlePlusButton);
};

addEventToCounterButtons();
