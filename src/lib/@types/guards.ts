export const contains = <T extends string>(
  list: Array<T> | ReadonlyArray<T>,
  value: string
): value is T => {
  return list.some((item) => item === value);
};
