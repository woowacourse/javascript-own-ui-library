import shinse from './shinse.js';

const render = (parsedNode, rootElementId) => {
	// root Element에 append
	const root = document.getElementById(rootElementId);
	root.innerHTML = '';

	// parsedNode: 렌더링할 node를 parsing한 객체
	const wrapperNode = shinse.createWrapperNode(parsedNode);
	root.append(wrapperNode);
};

const ShinseDOM = { render };
export default ShinseDOM;
