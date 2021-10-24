import React from "../../React";
import { ReactComponent } from "../../React/types";

const Count: ReactComponent = () => {
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
            children: [
              React.createElement("strong", {
                onClick: () => {
                  setCount(count - 1);
                },
                children: "-",
              }),
            ],
          }),
          React.createElement("button", {
            children: [
              React.createElement("strong", {
                onClick: () => {
                  setCount(0);
                },
                children: "RESET",
              }),
            ],
          }),
          React.createElement("button", {
            onClick: () => {
              console.log(count);
              setCount(count + 1);
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
