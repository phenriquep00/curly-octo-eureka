import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
}

export function Button(props: IButton) {
  return <button {...props}>{props.children}</button>;
}
