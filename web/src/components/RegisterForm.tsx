import { useState } from "react";
import { TextInput } from "./form/TextInput";
import { EmailInput } from "./form/EmailInput";
import { PasswordInput } from "./form/PasswordInput";
import { VerifyPasswordInput } from "./form/VerifyPasswordInput";

export function RegisterForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [matchPassword, setMatchPassword] = useState<string>("");

  const handleCreateNewUser = () => {};

  return (
    <div className="flex fixed flex-col items-center p-6 w-[350px]  md:w-[700px] gap-4 rounded-lg shadow-4xl drop-shadow-2xl bg-ctp-crust bg-opacity-90 backdrop-blur-md transition-all">
      <h1 className="text-ctp-text font-semibold text-lg">
        Register a account{" "}
      </h1>
      <form
        action=""
        onSubmit={handleCreateNewUser}
        className="flex items-center gap-4 justify-center rounded-lg flex-col min-w-full"
      >
        <div className="flex flex-col w-full mt-4 mb-4 gap-6">
          <TextInput action={setName} value={name} placeholder={"🤔 Name"} />
          <EmailInput action={setEmail} value={email} placeholder={"Email"} />
          <PasswordInput
            action={setPassword}
            value={password}
            placeholder={"Password"}
          />
          <VerifyPasswordInput
            password={password}
            action={setMatchPassword}
            value={matchPassword}
            placeholder={"Confirm password"}
          />
        </div>
      </form>
    </div>
  );
}
