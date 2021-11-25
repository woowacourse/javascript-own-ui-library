import proxy from "../proxy/proxy";
import createElement from "../utils/createElement";

const countState = {
  count: 0,
};

const Counter = () => {
  const countProxy = proxy(countState, Counter);

  const increaseCount = () => countProxy.count++;
  const decreaseCount = () => countProxy.count--;
  const resetCount = () => (countProxy.count = 0);

  return createElement(
    "div",
    { key: "0", class: "container" },
    createElement("span", { key: "01", class: "count" }, `${countProxy.count}`),
    createElement(
      "div",
      { key: "02", class: "btn-group" },
      createElement(
        "button",
        { key: "020", event: { click: decreaseCount } },
        createElement("strong", { key: "0200" }, "-")
      ),
      createElement(
        "button",
        { key: "021", event: { click: resetCount } },
        createElement("strong", { key: "0210" }, "RESET")
      ),
      createElement(
        "button",
        { key: "022", event: { click: increaseCount } },
        createElement("strong", { key: "0220" }, "+")
      )
    )
  );
};

export default Counter;
