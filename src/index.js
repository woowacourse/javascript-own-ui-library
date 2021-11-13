import App from "./components/App.js";
import { html } from "./utils/dom.js";

const ReactDOM = {
  render($elem, element) {
    element.appendChild($elem);
  }
};

ReactDOM.render(html`<custom-app />`, document.getElementById("root"));
