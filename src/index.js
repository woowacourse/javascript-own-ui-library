import { Broc, BrocDOM } from "../broc/index.js";
import Counter from "./Counter.js";

BrocDOM.render(Broc.createElement(Counter), document.querySelector("#root"));
