function _createElement(tag, attrs) {
  const $elem = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach((keyOfAttr) => {
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

const rootElement = document.getElementById("root");

const React = {
  createElement(tag, attrs, ...children) {
    const newDom = _createElement(tag, attrs);

    const validChildren = children.filter((child) => {
      return (
        typeof child !== "boolean" && child !== null && child !== undefined
      );
    });

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

const ReactDOM = {
  render($elem, rootElement) {
    rootElement.innerHTML = "";

    rootElement.append($elem);
  },
};

function createTextElement(text) {
  return document.createTextNode(text);
}

const { count, setCount } = (() => {
  let count = 0;

  const setCount = (_count) => {
    count = _count;

    ReactDOM.render(Element({ count }), rootElement);
  };

  return {
    count,
    setCount,
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
            setCount(count - 1);
          }}
        >
          <strong>-</strong>
        </button>
        <button
          onClick={() => {
            setCount(0);
          }}
        >
          <strong>RESET</strong>
        </button>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          <strong>+</strong>
        </button>
      </div>
      <div1>
        <div2>
          <div3>
            <div4>
              1<span>s</span>
            </div4>
          </div3>
        </div2>
      </div1>
    </div>
  </div>
);

ReactDOM.render(Element({ count }), rootElement);
