import React from "../../React";
import { ReactComponent } from "../../React/types";

const Count: ReactComponent = () => {
  const count = React.useState(0);

  return React.createElement("div", {
    className: "container",
    children: [
      React.createElement("span", {
        className: "count",
        children: count.value,
      }),
      React.createElement("div", {
        className: "btn-group",
        children: [
          React.createElement("button", {
            children: [
              React.createElement("strong", {
                onClick: () => {
                  count.value -= 1;
                },
                children: "-",
              }),
            ],
          }),
          React.createElement("button", {
            children: [
              React.createElement("strong", {
                onClick: () => {
                  count.value = 0;
                },
                children: "RESET",
              }),
            ],
          }),
          React.createElement("button", {
            onClick: () => {
              count.value += 1;
            },
            children: [
              React.createElement("strong", {
                children: "+",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

export default Count;
