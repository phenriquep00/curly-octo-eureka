import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
  title: string;
  primary?: boolean;
}

export function Button({ children, title, primary, ...rest }: IButton) {
  if (primary) {
    return (
      <button
        className="p-3 rounded-lg border-b-4 bg-ctp-green w-1/2 font-semibold text-ctp-surface1 border border-ctp-surface1 text-lg hover:bg-ctp-green/80 hover:border-b-2 hover:translate-y-1 focus:outline-none focus:ring ring-offset-1 focus:border-none ring-ctp-mauve ring-offset-ctp-crust transition-all ease-in-out"
        title={title}
        {...rest}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button title={title} {...rest}>
        {children}
      </button>
    );
  }
}
