import shinse from './shinse.js';

const render = (parsedNode, rootElementId) => {
	// parsedNode: 렌더링할 node를 parsing한 객체
	const wrapperNode = shinse.createWrapperNode(parsedNode);

	const root = document.getElementById(rootElementId);
	root.append(wrapperNode);
};

const ShinseDOM = { render };
export default ShinseDOM;
