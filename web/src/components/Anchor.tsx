import { AnchorHTMLAttributes } from "react";

interface IAnchor extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: JSX.Element | string;
}

export function Anchor({ children, ...rest }: IAnchor) {
  return <a {...rest}>{children}</a>;
}
