import deepObjectEqual from "../utils/deepEqual.js";
import { html } from "../utils/dom.js";

// 웹 컴포넌트 입니다.
class Component extends HTMLElement {
  constructor() {
    super();

    this.state = {};

    /* 
    프록시를 사용하려했는데 안되어서 남겨진 코드 (this.state 감지중인데 this.state.count = 0 했을때 프록시가 실행안되네요? ㅜ 클래스면 뭐 다른가?
      
    this.stateProxy = new Proxy(this.state, {
      get(target, prop) {
        console.log("proxy get");
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        console.log("proxy set"); // 왜 동작안하지?

        const newTemplate = this.getTemplate();
        this.diff(this.template, newTemplate);
      }
    });
  */
  }

  connectedCallback() {
    this.append(this.template);
  }

  getTemplate() {
    return html`<div></div>`;
  }

  timeId = null;

  updateVDom2RealDom() {
    this.diff(this.template, this.template.vDom);
  }

  render() {
    const newTemplate = this.getTemplate();

    if (!this.template) {
      this.template = newTemplate;
    }

    this.diff(this.template.vDom, newTemplate);

    if (this.timeId) {
      clearTimeout(this.timeId);
    }
    this.timeId = setTimeout(this.updateVDom2RealDom.bind(this), 100);
  }

  diff($oldDom, $newDom) {
    const oldDomIterator = document.createNodeIterator(
      $oldDom,
      NodeFilter.SHOW_ALL
    );
    const newDomIterator = document.createNodeIterator(
      $newDom,
      NodeFilter.SHOW_ALL
    );

    while (true) {
      let oldNode = oldDomIterator.nextNode();
      let newNode = newDomIterator.nextNode();

      if (!oldNode) {
        break;
      }

      if (!newNode) {
        break;
      }

      const isSameTagName = oldNode.localName === newNode.localName;

      const isSameAttributes =
        deepObjectEqual(Array.from(oldNode.attributes || [])) ===
        deepObjectEqual(Array.from(newNode.attributes || []));

      const isSameData = oldNode?.data === newNode?.data;

      const isSameChildrenLength =
        oldNode.childNodes.length === newNode.childNodes.length;

      const isSameDom =
        isSameTagName && isSameAttributes && isSameData && isSameChildrenLength;

      if (!isSameDom) {
        if (oldNode.nodeType === Node.TEXT_NODE) {
          oldNode.textContent = newNode.textContent;
        } else {
          oldNode.replaceWith(newNode);
        }
      }
    }
  }

  setState(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      this.state[key] = value;
    });

    this.render();
  }
}

export default Component;
