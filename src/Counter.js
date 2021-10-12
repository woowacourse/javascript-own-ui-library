import { Broc } from "../broc/index.js";

const Counter = () => {
  const [count, setCount] = Broc.useState(0);

  const onIncreaseButtonClick = () => {
    setCount((prev) => prev + 1);
  };

  const onDecreaseButtonClick = () => setCount((prev) => prev - 1);

  const onReset = () => setCount(0);

  return Broc.createElement(
    "div",
    { className: "container" },
    Broc.createElement("span", { className: "count" }, count),
    Broc.createElement(
      "div",
      { className: "btn-group" },
      Broc.createElement("button", null, Broc.createElement("strong", { onClick: onDecreaseButtonClick }, "-")),
      Broc.createElement("button", null, Broc.createElement("strong", { onClick: onReset }, "RESET")),
      Broc.createElement("button", null, Broc.createElement("strong", { onClick: onIncreaseButtonClick }, "+"))
    )
  );
};

export default Counter;
