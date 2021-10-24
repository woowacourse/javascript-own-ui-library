export const isHTMLElement = (element: object): element is HTMLElement => {
  return (element as HTMLElement).tagName && (element as HTMLElement)
    ? true
    : false;
};

export const isKeyOf = <T>(
  obj: T,
  key: string | number | symbol
): key is keyof typeof obj => {
  return key in obj ? true : false;
};
