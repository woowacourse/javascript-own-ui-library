export interface Props {
  children?: (ReactElement | ReactComponent)[] | string | number;
  className?: string;
  onClick?: () => void;
}

export interface ReactElement extends Props {
  nodeName: keyof HTMLElementTagNameMap;
}

export type ReactComponent = (props?: Props) => ReactElement;
