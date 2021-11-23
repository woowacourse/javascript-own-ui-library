import ShinseDOM from './shinse/shinseDOM.js';
import { getCounterNodeObj } from './counter/counter.js';

const rootElementId = 'root';

let state = {
	count: 0,
	secondCount: 0,
};

const stateManager = new Proxy(state, {
	get(target, prop) {
		return target[prop];
	},

	set(target, prop, value) {
		target[prop] = value;
		updateDOM();

		return true;
	},
});

ShinseDOM.render(getCounterNodeObj(stateManager), rootElementId);

const updateDOM = () => {
	ShinseDOM.render(getCounterNodeObj(stateManager), rootElementId);
	addEventToCounterButtons();
};

const handleMinusButton = () => {
	stateManager.count -= 1;
};

const handleResetButton = () => {
	stateManager.count = 0;
};

const handlePlusButton = () => {
	stateManager.count += 1;
};

const handleSecondMinusButton = () => {
	stateManager.secondCount -= 10;
};

const handleSecondResetButton = () => {
	stateManager.secondCount = 0;
};

const handleSecondPlusButton = () => {
	stateManager.secondCount += 10;
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
