import createElement from "../utils/createElement";

const Counter = () => {
  return createElement(
    "div",
    { class: "container" },
    createElement("span", { class: "count" }, "0"),
    createElement(
      "div",
      { class: "btn-group" },
      createElement("button", {}, createElement("strong", {}, "-")),
      createElement("button", {}, createElement("strong", {}, "RESET")),
      createElement("button", {}, createElement("strong", {}, "+"))
    )
  );
};

export default Counter;
