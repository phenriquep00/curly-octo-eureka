import { AnchorHTMLAttributes } from "react";

interface IAnchor extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: JSX.Element | string;
  title: string;
}

export function Anchor({ children, title, ...rest }: IAnchor) {
  return (
    <a title={title} {...rest}>
      {children}
    </a>
  );
}
