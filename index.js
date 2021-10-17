function _createElement(tag, attrs) {
  const $elem = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach((keyOfAttr) => {
      // attr들을 할당해줍니다. on으로 시작하면 이벤트라고  판단하고 이벤트걸어줍니다.
      if (
        keyOfAttr.startsWith("on") &&
        typeof attrs[keyOfAttr] === "function"
      ) {
        const event = keyOfAttr.replace("on", "").toLowerCase();

        $elem.addEventListener(event, attrs[keyOfAttr]);

        return;
      }

      $elem.setAttribute(keyOfAttr, attrs[keyOfAttr]);
    });
  }

  return $elem;
}

const rootElement = document.getElementById("root"); // #root 가지고온 변수

const React = {
  createElement(tag, attrs, ...children) {
    const newDom = _createElement(tag, attrs);

    // null, undefined, boolean값 쳐냅니다.
    const validChildren = children.filter((child) => {
      return (
        typeof child !== "boolean" && child !== null && child !== undefined
      );
    });

    // string이면 textElement로 추가합니다.
    newDom.append(
      ...validChildren.map((child) => {
        if (typeof child === "string") {
          return createTextElement(child);
        }

        return child;
      })
    );

    return newDom;
  },
};

const { addVDomQueue, exhaustVDomQueue } = (() => {
  const vDomQueue = [];

  // 변경사항들을 모아서 한번에 업데이트하는 로직입니다.
  // vDom을 흉내낸것인데, while문을 돌면서 real Dom에 업데이트가 여러번 일어날것 같아서, 제대로 동작할지는 모르겠습니다.
  const addVDomQueue = (diffCallback) => {
    vDomQueue.push(diffCallback);
  };

  const exhaustVDomQueue = () => {
    while (vDomQueue.length > 0) {
      const callback = vDomQueue.shift();
      callback();
    }
  };

  return {
    addVDomQueue,
    exhaustVDomQueue,
  };
})();

function diff($elem, $newElem) {
  if (!$elem.vDom) {
    // vDom이 없으면 자기자신으로 추가해줍니다.
    $elem = Object.assign($elem, {
      vDom: $elem,
    });
  }

  const isSameTagName = $elem.vDom?.nodeName === $newElem.nodeName;
  const isSameChildrenLength =
    $elem.vDom.childNodes.length === $newElem.childNodes.length; // 이걸로 자식요소가 완벽히 달라진점을 찾을 수는 없지만, 어차피 재귀로 돌것이므로 길이만 체크했습니다.
  const isSameAttrs =
    JSON.stringify($elem.vDom.attributes) ===
    JSON.stringify($newElem.attributes); // 심볼값처럼 stringify가 안되는 요소들은 따로 처리하지 않았습니다.
  const isSameData = $elem.vDom?.data === $newElem?.data;

  const isSameElement =
    isSameTagName && isSameChildrenLength && isSameAttrs && isSameData;

  if (!isSameElement) {
    // 다른 Dom이라고 판단되면, vDom을 업데이트하고, 업데이트 콜백을 queue에 추가해줍니다.
    $elem = Object.assign($elem, {
      vDom: $newElem,
    });
    addVDomQueue(() => {
      $elem.parentNode.replaceChild($elem.vDom, $elem);
    });

    return;
  }

  // 자식들에 대해서 diff를 수행합니다.
  for (let i = 0; i < $elem.childNodes.length; i++) {
    diff($elem.childNodes[i], $newElem.childNodes[i]);
  }
}

const ReactDOM = {
  render($elem, rootElement) {
    if (rootElement.firstChild === null) {
      // 없으면 그냥 추가합니다.
      rootElement.appendChild($elem);
    } else {
      diff(rootElement.firstChild, $elem);

      exhaustVDomQueue();
    }
  },
};

function createTextElement(text) {
  return document.createTextNode(text);
}

const { count, increaseCount, resetCount, decreaseCount } = (() => {
  let count = 0;

  const setCount = (_count) => {
    count = _count;

    ReactDOM.render(Element({ count }), rootElement);
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  };

  return {
    count,
    increaseCount,
    resetCount,
    decreaseCount,
  };
})();

/** @jsx React.createElement */
const Element = ({ count }) => (
  <div>
    <div class="container">
      <span class="count">{count}</span>
      <div class="btn-group">
        <button
          onClick={() => {
            decreaseCount();
          }}
        >
          <strong>-</strong>
        </button>
        <button
          onClick={() => {
            resetCount();
          }}
        >
          <strong>RESET</strong>
        </button>
        <button
          onClick={() => {
            increaseCount();
          }}
        >
          <strong>+</strong>
        </button>
      </div>
    </div>
  </div>
);

ReactDOM.render(Element({ count }), rootElement);
