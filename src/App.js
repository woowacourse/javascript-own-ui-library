import Component from "./core/Component.js";
import { html } from "./dom.js";

class App extends Component {
  static WebComponentName = "custom-app";

  count = 0;
  template = this.getTemplate();

  getTemplate() {
    return html`<div>
      <div class="container">
        <span class="count">${this.count}</span>
        <div class="btn-group">
          <button onClick=${this.decreaseCount.bind(this)}>
            <strong>-</strong>
          </button>
          <button onClick=${this.resetCount.bind(this)}>
            <strong>RESET</strong>
          </button>
          <button onClick=${this.increaseCount.bind(this)}>
            <strong>+</strong>
          </button>
        </div>
        ${true && "<div>하이</div>"}
      </div>
    </div>`;
  }

  setCount(_count) {
    this.count = _count;

    this.render();
  }

  decreaseCount() {
    this.setCount(this.count - 1);
  }
  resetCount() {
    this.setCount(0);
  }
  increaseCount() {
    this.setCount(this.count + 1);
  }

  connectedCallback() {
    this.append(this.template);
  }

  render() {
    const newTemplate = this.getTemplate();

    this.diff(this.template, newTemplate);
  }
}

export default App;
