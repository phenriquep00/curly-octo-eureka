import { FormEvent, useEffect, useState } from "react";
import { Anchor } from "./Anchor";

import jwt_decode from "jwt-decode";
import { Button } from "./Button";

export function LoginForm() {
  const [user, setuser] = useState<any>({});

  const handleCallbackResponse = (response: any) => {
    console.log(response.credential);

    var userObject = jwt_decode(response.credential);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    /* global google */
    // @ts-ignore
    google.accounts.id.initialize({
      client_id:
        "635718201896-1v05hgpg57pj74e9709e6qh92ram5284.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    // @ts-ignore
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    // @ts-ignore
    google.accounts.id.prompt();
  }, []);

  return (
    <div className="flex fixed flex-col items-center justify-between p-6 w-[350px] h-[420px] md:w-[700px] md:h-[500px] gap-4 rounded-lg shadow-4xl drop-shadow-2xl bg-ctp-crust bg-opacity-90 backdrop-blur-md transition-all">
      <div id="signInDiv" />
      <form
        onSubmit={handleLogin}
        className="flex items-center gap-4 justify-center rounded-lg flex-col w-full p-4"
      >
        <div className="flex flex-col w-full gap-6">
          <input
            className="p-4 rounded-md bg-ctp-surface2 border-2 border-ctp-overlay1 text-ctp-text text-md font-medium placeholder:font-medium placeholder:text-ctp-subtext0 focus:bg-ctp-crust focus:ring-2 ring-ctp-green focus:outline-none focus:border-none ring-offset-1 ring-offset-ctp-crust transition-all"
            placeholder="✉️  johndoe@somemail.com"
            type="email"
            name="email"
            id="email"
          />
          <input
            className="p-4 rounded-md bg-ctp-surface2 border-2 border-ctp-overlay1 text-ctp-text text-md font-medium placeholder:font-medium placeholder:text-ctp-subtext0 focus:bg-ctp-crust focus:ring-2 ring-ctp-green focus:outline-none ring-offset-1 focus:border-none ring-offset-ctp-crust transition-all"
            placeholder="🔑  ********"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <Button
          className="p-3 bg-ctp-green w-1/2 rounded font-semibold text-ctp-surface1 border border-ctp-surface1 text-lg hover:bg-opacity-80 hover:text-ctp-text hover:animate-pulse focus:animate-pulse focus:outline-none focus:ring ring-offset-1 focus:border-none ring-ctp-mauve ring-offset-ctp-crust transition-all ease-in-out"
          type="submit"
          title="click here to log in"
        >
          login
        </Button>
      </form>
      {/* redirect user to register or password recovery pages*/}
      <div className="flex flex-col gap-1 mb-6 border-t border-ctp-overlay0 w-full">
        <p className="flex mt-1 items-center justify-center text-ctp-subtext1 font-medium text-base ">
          Don't have a account? &nbsp;
          <Anchor
            title="click here to be redirected to the registration page"
            className="underline text-ctp-peach hover:text-ctp-yellow transition-colors"
            href="#"
          >
            register here!
          </Anchor>
        </p>

        <p className="flex mt-1 items-center justify-center text-ctp-subtext1 font-medium text-base ">
          Forgot your password?  &nbsp;
          <Anchor
            title="click here to be redirected to the registration page"
            className="underline text-ctp-peach hover:text-ctp-yellow transition-colors"
            href="#"
          >
            reset password!
          </Anchor>
        </p>
      </div>
    </div>
  );
}
