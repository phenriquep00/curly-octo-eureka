import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

interface IAnchor extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
  title: string;
}

export function Anchor({ children, title, ...rest }: IAnchor) {
  return (
    <button title={title} {...rest}>
      {children}
    </button>
  );
}
