import { domRender, el, cp, Component } from './Simba/index.js';

class Count extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.st(
      el('span', { class: 'count' }, {}, [
        el('text', {}, {}, this.props.amount),
      ])
    );
  }
}

class ButtonGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.st(
      el('div', { class: 'btn-group' }, {}, [
        el('button', {}, { click: this.props.decrease }, [
          el('strong', {}, {}, [el('text', {}, {}, '-')]),
        ]),
        el('button', {}, { click: this.props.reset }, [
          el('strong', {}, {}, [el('text', {}, {}, 'RESET')]),
        ]),
        el('button', {}, { click: this.props.increase }, [
          el('strong', {}, {}, [el('text', {}, {}, '+')]),
        ]),
      ])
    );
  }
}
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { amount: 0 };

    this.decrease = this.decrease.bind(this);
    this.reset = this.reset.bind(this);
    this.increase = this.increase.bind(this);
  }

  decrease() {
    this.setState({ amount: this.state.amount - 1 });
  }

  reset() {
    this.setState({ amount: 0 });
  }

  increase() {
    this.setState({ amount: this.state.amount + 1 });
  }

  render() {
    return this.st(
      el('div', { class: 'container' }, {}, [
        cp(Count, { amount: this.state.amount }),
        cp(ButtonGroup, {
          decrease: this.decrease,
          reset: this.reset,
          increase: this.increase,
        }),
      ])
    );
  }
}

domRender(cp(Container, {}), document.getElementById('root'));
