import React from "React";

const element = React.createElement("div", {
  className: "container",
  children: [
    React.createElement("span", {
      className: "count",
      children: "0",
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

React.render(element, document.querySelector("#root"));
