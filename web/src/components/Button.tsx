import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
  title: string;
}

export function Button({ children, title, ...rest }: IButton) {
  return (
    <button title={title} {...rest}>
      {children}
    </button>
  );
}
