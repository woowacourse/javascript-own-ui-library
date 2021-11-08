declare interface ObjectConstructor {
  keys<T extends Object>(object: T): Array<keyof T>;
}
