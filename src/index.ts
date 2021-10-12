import MyDOM from "./myReact/render";
import "./index.css";
import App from "./App";

const $root = document.querySelector<HTMLElement>("#root");

if ($root) MyDOM.render(App, $root);
else console.error("#root element를 찾지 못했습니다");
