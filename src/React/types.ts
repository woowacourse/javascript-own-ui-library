export interface ReactElement {
  nodeName: keyof HTMLElementTagNameMap;
  children?: ReactElement[] | string;
  className?: string;
}
