export const getRegExp = (pattern: string, flag: string = "g") => {
  return new RegExp(pattern, flag);
};
