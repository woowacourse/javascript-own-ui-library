export const isHTMLElement = (element: object): element is HTMLElement => {
  return (element as HTMLElement).tagName && (element as HTMLElement)
    ? true
    : false;
};
