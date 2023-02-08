import { useEffect, useState } from "react";
import { IPasswordInput } from "./PasswordInput";

interface IVerifyPasswordInput extends IPasswordInput {
  password: string;
}

export function VerifyPasswordInput({
  password,
  value,
  placeholder = "Verify password",
  action,
}: IVerifyPasswordInput) {
  const [passwordsAreEqual, setPasswordsAreEqual] = useState<boolean>(
    password === value ? true : false
  );

  const matchPasswords = () => {
    if (password === value) setPasswordsAreEqual(true);
    else setPasswordsAreEqual(false);
  };

  useEffect(() => {matchPasswords()}, [password])

  return (
    <div className="w-full flex justify-center">
      <input
        className={`
      ${!passwordsAreEqual && "border-2 border-ctp-red bg-ctp-red/60"}
     w-full p-4 rounded-md bg-ctp-surface2 border-2 border-ctp-overlay1 text-ctp-text text-md font-medium placeholder:font-medium placeholder:text-ctp-subtext0 focus:bg-ctp-crust focus:ring-2 ring-ctp-green ring-offset-1 focus:border-none ring-offset-ctp-crust transition-all`}
        placeholder={"🔑  " + placeholder}
        onBlur={matchPasswords}
        onChange={(e) => action(e.target.value)}
        value={value}
        type="password"
        name="matchPasswords"
        id="matchPasswords"
      />
        <div hidden={passwordsAreEqual} className="absolute bg-ctp-red p-2 rounded -mt-4 px-4">
            the passwords are different!
        </div>
    </div>
  );
}
