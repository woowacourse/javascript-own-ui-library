import React from "../../React";

const Count = () => {
  const [count, setCount] = React.useState(0);

  return React.createElement("div", {
    className: "container",
    children: [
      React.createElement("span", {
        className: "count",
        children: count,
      }),
      React.createElement("div", {
        className: "btn-group",
        children: [
          React.createElement("button", {
            children: [React.createElement("strong", { children: "-" })],
          }),
          React.createElement("button", {
            children: [React.createElement("strong", { children: "RESET" })],
          }),
          React.createElement("button", {
            children: [React.createElement("strong", { children: "+" })],
          }),
        ],
      }),
    ],
  });
};

export default Count;
