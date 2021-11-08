import React, { ReactDOM } from "../../React";
import { ReactComponent } from "../../React/util/types";

const Count: ReactComponent = () => {
  const count = React.useState(0);

  return ReactDOM.createElement("div", {
    className: "container",
    children: [
      ReactDOM.createElement("span", {
        className: "count",
        children: count.value,
      }),
      ReactDOM.createElement("div", {
        className: "btn-group",
        children: [
          ReactDOM.createElement("button", {
            children: [
              ReactDOM.createElement("strong", {
                onClick: () => {
                  count.value -= 1;
                },
                children: "-",
              }),
            ],
          }),
          ReactDOM.createElement("button", {
            children: [
              ReactDOM.createElement("strong", {
                onClick: () => {
                  count.value = 0;
                },
                children: "RESET",
              }),
            ],
          }),
          ReactDOM.createElement("button", {
            onClick: () => {
              count.value += 1;
              count.value += 1;
              count.value += 1;
              count.value += 1;
              count.value += 1;
              count.value += 1;
              count.value += 1;
              count.value += 1;
              count.value += 1;
              count.value += 1;
            },
            children: [
              ReactDOM.createElement("strong", {
                children: "+10",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

export default Count;
