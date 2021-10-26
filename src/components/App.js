import Component from "../core/Component.js";
import { html } from "../utils/dom.js";

class App extends Component {
  static WebComponentName = "custom-app";

  constructor() {
    super();
    const initialState = { count: 0 };

    this.minCount = 0;
    this.maxCount = 100;

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

          <span>
            <input
              type="range"
              min="${this.minCount}"
              max="${this.maxCount}"
              onChange=${this.onChange.bind(this)}
              value=${this.state.count}
            />
          </span>

          <div>
            ${false &&
            html`<div>
              <span>jsx파서 조건부 렌더링 테스트: 안보여야함</span> ${this.state
                .count}
            </div>`}
          </div>
          <div>
            ${true &&
            html`<div>
              <span>jsx파서 조건부 렌더링 테스트:</span> ${this.state.count}
            </div>`}
          </div>
        </div>
      </div>`;
    };

    this.template = this.getTemplate();
  }

  onChange(event) {
    this.setState({
      count: Number(event.target.value)
    });
  }

  decreaseCount() {
    if (!(this.minCount <= this.state.count - 1)) {
      alert(`${this.minCount}이상이어야 합니다.`);

      return;
    }
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
    if (!(this.state.count + 1 <= this.maxCount)) {
      alert(`${this.maxCount}이하여야 합니다.`);

      return;
    }
    this.setState({
      count: this.state.count + 1
    });
  }
}

if (!window.customElements.get(App.WebComponentName)) {
  window.customElements.define(App.WebComponentName, App);
}

export default App;
