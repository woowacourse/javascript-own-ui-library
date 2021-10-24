import { isHTMLElement } from "./typeGuard";
import { ReactElement } from "./types";

export const convertReactElementToDOM = (element: ReactElement) => {
  const $newDOM = document.createElement(element.nodeName);

  if (element.className) {
    $newDOM.className = element.className;
  }

  if (element.onClick) {
    $newDOM.onclick = element.onClick;
  }

  if (element.className) {
    $newDOM.className = element.className;
  }

  return $newDOM;
};

export const getDOMElementToRender = (element: ReactElement): HTMLElement => {
  const $newDOM = convertReactElementToDOM(element);
  const children = element.children;

  if (children === undefined) {
    return;
  }

  if (typeof children === "string") {
    $newDOM.innerText = children;
    return $newDOM;
  }

  if (typeof children === "number") {
    $newDOM.innerText = String(children);
    return $newDOM;
  }

  children.forEach((child) => {
    const childToAppend = getDOMElementToRender(child);

    if (childToAppend !== undefined) {
      $newDOM.appendChild(childToAppend);
    }
  });

  return $newDOM;
};

export const updateOnlyChangedDOM = (
  $virtualDOM: HTMLElement,
  $actualDOM: HTMLElement
) => {
  $actualDOM.onclick = $virtualDOM.onclick;

  if ($virtualDOM.tagName !== $actualDOM.tagName) {
    $actualDOM.replaceWith($virtualDOM);
    return;
  }

  if ($virtualDOM.className !== $actualDOM.className) {
    $actualDOM.className = $virtualDOM.className;
  }

  const biggestChildNodesLength = Math.max(
    $virtualDOM.childNodes.length,
    $actualDOM.childNodes.length
  );

  [...Array(biggestChildNodesLength)].forEach((_, index) => {
    const $actualChildNode = $actualDOM.childNodes[index];
    const $virtualChildNode = $virtualDOM.childNodes[index];

    if ($actualChildNode === undefined) {
      $actualDOM.appendChild($virtualChildNode);
      return;
    }

    if ($virtualChildNode === undefined) {
      $actualChildNode.remove();
      return;
    }

    if (isHTMLElement($virtualChildNode) && isHTMLElement($actualChildNode)) {
      updateOnlyChangedDOM($virtualChildNode, $actualChildNode);
      return;
    }

    $actualChildNode.replaceWith($virtualChildNode);
  });
};
