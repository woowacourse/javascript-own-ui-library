const createLastNode = (element) => {
	const newNode = document.createElement(element.tag);

	addAttribute(newNode, element);
	addInnerText(newNode, element);

	return newNode;
};

const addAttribute = (newTag, element) => {
	if (element.class) {
		newTag.setAttribute('class', element.class);
	}

	if (element.id) {
		newTag.setAttribute('id', element.id);
	}
};

const addInnerText = (newTag, element) => {
	if (element.childrenType !== 'node') {
		newTag.innerText = element.children;
	}
};

const insertNode = (element) => {
	const childNode = document.createElement(element.tag);
	// 가장 바깥 Node 생성

	// 만약 children이 node라면 재귀적으로 children을 넣어주기
	if (element.childrenType === 'node') {
		Array.from(element.children).forEach((el) => {
			if (el.childrenType === 'node') {
				childNode.append(createWrapperNode(el));
			} else {
				childNode.append(createLastNode(el));
			}
		});
	}

	// childrenType에 상관없이 속성, innerText 공통적으로 추가
	addAttribute(childNode, element);
	addInnerText(childNode, element);

	// 내부까지 돌며 childNode를 생성하여,
	// 최종 wrapperNode에 append할 준비가 완료된 childNode를 return
	return childNode;
};

const createWrapperNode = (element) => {
	// 가장 바깥을 감싸는 wrapperNode 만들기
	const wrapperNode = createLastNode(element);

	// wrapperNode 내부 map을 돌며, children node를 넣어주기
	Array.from(element.children).forEach((el) => {
		const childNode = insertNode(el);
		wrapperNode.append(childNode);
	});

	return wrapperNode;
};

const shinse = { createWrapperNode };
export default shinse;
