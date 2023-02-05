interface ITextInput {
    value: string;
    placeholder: string;
    action: (e: string) => void;
  }
  
  export function TextInput({ value, placeholder, action }: ITextInput) {
    return (
      <input
        className="p-4 rounded-md bg-ctp-surface2 border-2 border-ctp-overlay1 text-ctp-text text-md font-medium placeholder:font-medium placeholder:text-ctp-subtext0 focus:bg-ctp-crust focus:ring-2 ring-ctp-green focus:outline-none focus:border-none ring-offset-1 ring-offset-ctp-crust transition-all"
        placeholder={placeholder}
        onChange={(e) => action(e.target.value)}
        value={value}
        type="email"
        name="email"
        id="email"
      />
    );
  }
  