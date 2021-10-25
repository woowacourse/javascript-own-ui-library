import App from "./App.js";
import { html } from "./dom.js";

if (!window.customElements.get(App.WebComponentName)) {
  window.customElements.define(App.WebComponentName, App);
}

const ReactDOM = {
  render($elem, element) {
    element.appendChild($elem);
  }
};

ReactDOM.render(html`<custom-app />`, document.getElementById("root"));
