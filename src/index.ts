import "./index.css";

import App from "./components/App";
import initRenderer from "./lib/render";

const $root = document.querySelector("#root");

initRenderer($root, App);
