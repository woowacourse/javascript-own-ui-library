import { html } from "../utils/dom.js";

// 웹 컴포넌트 입니다.
class Component extends HTMLElement {
  constructor() {
    super();

    this.initState();
    this.template = this.getTemplate();
    this.append(this.template);
  }

  initState() {
    this.state = {};
  }

  // 웹 컴포넌트에서 기본적으로 제공하는 메서드로, 엘리먼트가 Dom에 붙으면 실행됩니다. (현재 안씀)
  connectedCallback() {
    /* 
    프록시를 사용하려했는데 안되어서 남겨진 코드 (this.state 감지중인데 this.state.count = 0 했을때 프록시가 실행안되네요? ㅜ 클래스면 뭐 다른가?
    */
    // this.stateProxy = new Proxy(this.state, {
    //   get(target, prop) {
    //     console.log("proxy get");
    //     return target[prop];
    //   },
    //   set(target, prop, value) {
    //     target[prop] = value;
    //     console.log("proxy set"); // 왜 동작안하지?
    //     const newTemplate = this.getTemplate();
    //     this.diff(this.template, newTemplate);
    //   }
    // });
  }

  // 템플릿을 반환하는 함수입니다.
  getTemplate() {
    return html`<div></div>`;
  }

  // 디바운스용입니다.
  timeId = null;

  // vDom의 변경사항을 실제 Dom에 반영하는 메서드 입니다.
  updateVDom2RealDom() {
    this.diff(this.template, this.template.vDom);
  }

  // 그리기 메서드입니다.
  render() {
    // 처음에 template없으면 여기서 할당해줍니다.
    if (!this.template) {
      this.template = this.getTemplate();
    }

    // 최신 상태값을 반영하여, vDom을 업데이트 합니다.
    this.diff(this.template.vDom, this.getTemplate());

    // 디바운스를 사용하여, 100ms이내에 변경사항이 있으면 추가로 vDom에 반영합니다.
    if (this.timeId) {
      clearTimeout(this.timeId);
    }

    // 100ms 지나도록 변경사항이 없으면, RealDom에 업데이트 합니다.
    this.timeId = setTimeout(this.updateVDom2RealDom.bind(this), 100);
  }

  // diff 메서드입니다.
  diff($oldDom, $newDom) {
    // oldDom과 newDom을 순회하는 이터레이터입니다.
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

      // 같은 태그인가?
      const isSameTagName = oldNode.localName === newNode.localName;

      // 같은 속성인가?
      const oldNodeAttrs = Array.from(oldNode.attributes || []).sort(
        (a, b) => a.nodeName < b.nodeName
      );
      const newNodeAttrs = Array.from(newNode.attributes || []).sort(
        (a, b) => a.nodeName < b.nodeName
      );

      const isSameAttributes =
        oldNodeAttrs.length === newNodeAttrs.length &&
        oldNodeAttrs.every((oldNodeAttr, index) => {
          const newNodeAttr = newNodeAttrs[index];

          return (
            oldNodeAttr.nodeName === newNodeAttr.nodeName &&
            oldNodeAttr.nodeValue === newNodeAttr.nodeValue
          );
        }) &&
        oldNodeAttrs.length === newNodeAttrs.length;

      // 같은 데이터인가?
      const isSameData = oldNode?.data === newNode?.data;

      // 같은 길이의 자식들인가?
      const isSameChildrenLength =
        oldNode.childNodes.length === newNode.childNodes.length;

      // 그래서 같은 Dom인가?
      const isSameDom =
        isSameTagName && isSameAttributes && isSameData && isSameChildrenLength;

      // 다른 Dom이라고 판단되었을때 diff를 적용합니다.
      if (!isSameDom) {
        // text노드면 text값만 바꿔줍니다.
        if (oldNode.nodeType === Node.TEXT_NODE) {
          oldNode.textContent = newNode.textContent;
        } else {
          // Dom 자체가 다르면 바꿔줍니다.
          oldNode.replaceWith(newNode);

          // 바꾸고나서 next로 한번 더 가야, 이터레이터 순서가 newNode와 같길래 한번더 next 해줬습니다.
          oldNode = oldDomIterator.nextNode();
        }
      }
    }

    // 업데이트된 oldDom의 vDom을 자기자신으로 업데이트 해줍니다.
    $oldDom.vDom = $oldDom;
  }

  setState(newState) {
    // 상태를 반영합니다. 여기서 Proxy가 동작하지 않았습니다 ㅜ
    Object.entries(newState).forEach(([key, value]) => {
      this.state[key] = value;
    });

    // 상태가 변경되었으니 render해줍니다.
    this.render();
  }
}

export default Component;
