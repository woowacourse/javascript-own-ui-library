import { ReactElement } from "./types";

const convertReactToHtmlElement = (reactElement: ReactElement) => {
  const $element = document.createElement(reactElement.nodeName);

  return $element;
};
