import { useState } from "react";
import { TextInput } from "./form/TextInput";
import { EmailInput } from "./form/EmailInput";
import { PasswordInput } from "./form/PasswordInput";

export function RegisterForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // TODO: fix X axis paddings for inputs

  const handleCreateNewUser = () => {};

  return (
    <div className="flex fixed flex-col items-center p-6 w-[350px] h-[420px] md:w-[700px] md:max-h-[500px] gap-4 rounded-lg shadow-4xl drop-shadow-2xl bg-ctp-crust bg-opacity-90 backdrop-blur-md transition-all">
      <h1 className="text-ctp-text font-semibold text-lg">
        Register a account{" "}
      </h1>
      <form action="" onSubmit={handleCreateNewUser}>
        <div className="flex flex-col w-full mt-4 mb-4 gap-6">
          <TextInput
            action={setName}
            value={name}
            placeholder="🤔 Name"
          />
          <EmailInput action={setEmail} value={email} placeholder={"Email"}/>
          <PasswordInput action={setPassword} value={password} placeholder={"Password"}/>
        </div> 
      </form>
    </div>
  );
}
