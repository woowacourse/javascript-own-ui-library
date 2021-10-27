import Component from "../core/Component.js";
import { html } from "../utils/dom.js";

class App extends Component {
  // 웹 컴포넌트는 '-'이 포함된 커스텀 태그를 쓸 수 있습니다.
  static WebComponentName = "custom-app";

  initState() {
    this.minCount = 0;
    this.maxCount = 100;

    this.state = { count: 0 };
  }

  getTemplate() {
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

// 웹컴포넌트는 window에 커스텀 태그를 정의해줘야 사용가능합니다.
if (!window.customElements.get(App.WebComponentName)) {
  window.customElements.define(App.WebComponentName, App);
}

export default App;
