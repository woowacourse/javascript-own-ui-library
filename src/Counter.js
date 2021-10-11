import { Broc } from "../broc/index.js";

const Counter = () => {
  const [count, setCount] = Broc.useState(0);

  const increase = () => {
    setCount((prev) => prev + 1);
  };

  const decrease = () => setCount((prev) => prev - 1);

  return Broc.createElement(
    "div",
    { className: "container" },
    Broc.createElement("span", { className: "count" }, count),
    Broc.createElement(
      "div",
      { className: "btn-group" },
      Broc.createElement("button", null, Broc.createElement("strong", { onClick: decrease }, "-")),
      Broc.createElement("button", null, Broc.createElement("strong", null, "RESET")),
      Broc.createElement("button", null, Broc.createElement("strong", { onClick: increase }, "+"))
    )
  );
};

export default Counter;
