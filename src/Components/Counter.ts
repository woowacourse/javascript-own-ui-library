import React, { ReactDOM } from "../../React";
import { ReactComponent } from "../../React/util/types";

const Counter: ReactComponent = () => {
  const count = React.useState(0);

  return ReactDOM.createReactElement("div", {
    className: "container",
    children: [
      ReactDOM.createReactElement("span", {
        className: "count",
        children: count.value,
      }),
      ReactDOM.createReactElement("div", {
        className: "btn-group",
        children: [
          ReactDOM.createReactElement("button", {
            children: [
              ReactDOM.createReactElement("strong", {
                onClick: () => {
                  count.value -= 1;
                },
                children: "-",
              }),
            ],
          }),
          ReactDOM.createReactElement("button", {
            children: [
              ReactDOM.createReactElement("strong", {
                onClick: () => {
                  console.log("아무런 state를 바꾸지 않음");
                },
                children: "RESET",
              }),
            ],
          }),
          ReactDOM.createReactElement("button", {
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
              ReactDOM.createReactElement("strong", {
                children: "+10",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

export default Counter;
