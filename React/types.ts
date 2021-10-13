export interface ReactElement {
  nodeName: keyof HTMLElementTagNameMap;
  children?: ReactElement[] | string | number;
  className?: string;
}
