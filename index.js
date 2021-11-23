import ShinseDOM from './shinse/shinseDOM.js';
import { getCounterNodeObj } from './counter/counter.js';

const rootElementId = 'root';

let state = {
	count: 0,
	secondCount: 0,
};

const countProxy = new Proxy(state, {
	get(target, prop) {
		return target[prop];
	},

	set(target, prop, value) {
		target[prop] = value;
		return true;
	},
});

ShinseDOM.render(getCounterNodeObj(countProxy), rootElementId);

const updateDOM = () => {
	ShinseDOM.render(getCounterNodeObj(countProxy), rootElementId);
	addEventToCounterButtons();
};

const handleMinusButton = () => {
	countProxy.count -= 1;
	updateDOM();
};

const handleResetButton = () => {
	countProxy.count = 0;
	updateDOM();
};

const handlePlusButton = () => {
	countProxy.count += 1;
	updateDOM();
};

const handleSecondMinusButton = () => {
	countProxy.secondCount -= 10;
	updateDOM();
};

const handleSecondResetButton = () => {
	countProxy.secondCount = 0;
	updateDOM();
};

const handleSecondPlusButton = () => {
	countProxy.secondCount += 10;
	updateDOM();
};

const addEventToCounterButtons = () => {
	const minusButton = document.getElementById('minus-button');
	const resetButton = document.getElementById('reset-button');
	const plusButton = document.getElementById('plus-button');
	const secondMinusButton = document.getElementById('second-minus-button');
	const secondResetButton = document.getElementById('second-reset-button');
	const secondPlusButton = document.getElementById('second-plus-button');

	minusButton.addEventListener('click', handleMinusButton);
	resetButton.addEventListener('click', handleResetButton);
	plusButton.addEventListener('click', handlePlusButton);
	secondMinusButton.addEventListener('click', handleSecondMinusButton);
	secondResetButton.addEventListener('click', handleSecondResetButton);
	secondPlusButton.addEventListener('click', handleSecondPlusButton);
};

addEventToCounterButtons();
