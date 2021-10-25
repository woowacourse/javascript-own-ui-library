import App from "./App.js";
import { html } from "./dom.js";

const ReactDOM = {
  render($elem, element) {
    element.appendChild($elem);
  }
};

ReactDOM.render(html`<custom-app />`, document.getElementById("root"));
