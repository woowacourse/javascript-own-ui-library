import createElement from "./utils/createElement";
import render from "./utils/render";
import "./index.css";

const dom = createElement("div", {
  props: { className: "container" },
  children: [
    createElement("span", { props: { className: "count" }, children: ["0"] }),
    createElement("div", {
      props: { className: "btn-group" },
      children: [
        createElement("button", {
          children: [createElement("strong", { children: ["-"] })],
        }),
        createElement("button", {
          children: [createElement("strong", { children: ["RESET"] })],
        }),
        createElement("button", {
          children: [createElement("strong", { children: ["+"] })],
        }),
      ],
    }),
  ],
});

const $root = document.querySelector("#root");

if ($root) render(dom, $root);
else console.error("#root element를 찾지 못했습니다");
