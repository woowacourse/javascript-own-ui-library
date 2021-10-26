import Component from "../core/Component.js";
import { html } from "../utils/dom.js";

class App extends Component {
  static WebComponentName = "custom-app";

  constructor() {
    super();
    const initialState = { count: 0 };
    this.setState(initialState);
    this.getTemplate = () => {
      return html`<div>
        <div class="container">
          <span class="count">${this.state.count}</span>
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
          ${true &&
          html`<div>
            <span>조건부 렌더링 테스트:</span> ${this.state.count}
          </div>`}
        </div>
      </div>`;
    };

    this.template = this.getTemplate();
  }

  decreaseCount() {
    this.setState({
      count: this.state.count - 1
    });
  }
  resetCount() {
    this.setState({
      count: 0
    });
  }
  increaseCount() {
    this.setState({
      count: this.state.count + 1
    });
  }
}

if (!window.customElements.get(App.WebComponentName)) {
  window.customElements.define(App.WebComponentName, App);
}

export default App;
