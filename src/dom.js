const TAGGED_TEMPLATE_LITERAL_PARAM_FLAG = "dobyParamArrIndex=";

const attachEvent = (dom, eventType, cb) => {
  dom.addEventListener(eventType, cb);
};

export const html = (stringArr, ...paramArr) => {
  const htmlStr = stringArr.reduce((acc, curr, index) => {
    acc += curr;
    if (paramArr[index] !== undefined) {
      if (typeof paramArr[index] === "string") {
        acc += paramArr[index];
      } else {
        acc += `${TAGGED_TEMPLATE_LITERAL_PARAM_FLAG}${index}`;
      }
    }

    return acc;
  }, "");

  // 내가 새로 그려야할 dom
  const $domFromHtmlString = new DOMParser()
    .parseFromString(htmlStr, "text/html")
    .querySelector("body").firstChild;

  const domIterator = document.createNodeIterator(
    $domFromHtmlString,
    NodeFilter.SHOW_ALL
  );

  const applyAttribute = (dom, attributes) => {
    for (const attribute of attributes) {
      const attrName = attribute.name;
      let value = attribute.nodeValue;

      if (value.includes(TAGGED_TEMPLATE_LITERAL_PARAM_FLAG)) {
        const realValueIndex = value.split("=")[1];

        value = paramArr[realValueIndex];
      }

      if (attrName.startsWith("on")) {
        attachEvent(dom, attrName.slice(2).toLowerCase(), value);
        dom.removeAttribute(attrName);
      } else {
        dom.setAttribute(attrName, value);
      }
    }
  };

  while (true) {
    const node = domIterator.nextNode();
    if (!node) break;

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;

      if (text.includes(TAGGED_TEMPLATE_LITERAL_PARAM_FLAG)) {
        const realValueIndex = Number(text.split("=")[1].trim());

        if (paramArr[realValueIndex] instanceof HTMLElement) {
          node.replaceWith(paramArr[realValueIndex]);
        } else {
          node.textContent = paramArr[realValueIndex];
        }
      }
    }

    const attributes = Array.from(node.attributes ?? []);

    if (attributes.length > 0) applyAttribute(node, attributes);

    node.vDom = node;
  }

  return $domFromHtmlString;
};
