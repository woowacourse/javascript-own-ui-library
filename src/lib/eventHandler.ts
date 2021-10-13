import { Handler } from "./@types/types";
import {
  getElementSelector,
  getVElementProperty,
  isAllAttributesMatch,
  isAllStyleMatch,
  isClassNamesExist,
} from "./utils/utils";

const isRightTarget = (
  target: HTMLElement,
  vElementProperty: ReturnType<typeof getVElementProperty>
) => {
  const { attributes, classes, id, styles, tagType } = vElementProperty;

  if (id && (target as HTMLElement).id !== id) {
    return false;
  }

  if (classes && !isClassNamesExist(target, classes)) {
    return false;
  }

  if (tagType !== target.tagName.toLowerCase()) {
    return false;
  }

  if (attributes && !isAllAttributesMatch(target, attributes)) {
    return false;
  }

  if (styles && !isAllStyleMatch(target, styles)) {
    return false;
  }

  return true;
};

export const getGlobalEventHandler =
  (eventHandlers: Handler[]) =>
  ({ target }: Event) => {
    eventHandlers.forEach((handler) => {
      const selector = getElementSelector(handler.template);
      const vElementProperty = getVElementProperty(handler.template);

      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (!isRightTarget(target, vElementProperty)) {
        const $closest = target.closest(selector) as HTMLElement;
        if (!$closest) {
          return;
        }

        if (!isRightTarget($closest, vElementProperty)) {
          return;
        }
      }

      handler.callback();
    });
  };
