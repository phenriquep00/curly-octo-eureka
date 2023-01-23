interface IAnchor {
  to: string;
  children: JSX.Element | string;
}

export function Anchor({ to, children }: IAnchor) {
  return (
    <a
      className="flex items-center justify-center text-ctp-subtext1 font-medium text-lg hover:text-ctp-green transition-colors"
      target="_self"
      href={to}
    >
      {children}
    </a>
  );
}
