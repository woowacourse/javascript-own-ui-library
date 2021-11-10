import './index.css';
import Component from './utils/Component';
import CustomDOM from './utils/CustomDOM';

// 실습 ====
class App extends Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }

  increase() {
    this.setState({ ...this.state, count: this.state.count + 1 });
  }

  decrease() {
    this.setState({ ...this.state, count: this.state.count - 1 });
  }

  reset() {
    this.setState({ ...this.state, count: 0 });
  }

  render() {
    const AppElement = (
      <div className='container'>
        <span className='count'>{this.state.count}</span>
        <div className='btn-group'>
          <button>
            <strong onClick={() => this.decrease()}>-</strong>
          </button>
          <button>
            <strong onClick={() => this.reset()}>RESET</strong>
          </button>
          <button>
            <strong onClick={() => this.increase()}>+</strong>
          </button>
        </div>
      </div>
    );

    CustomDOM.render(AppElement, document.getElementById('root'));
    return;
  }
}

const app = new App();
app.render();
