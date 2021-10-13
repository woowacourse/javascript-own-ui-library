import "./index.css";

import Root from "./components/Root";
import initRenderer from "./lib/render";

const $root = document.querySelector("#root");

initRenderer($root, Root);
