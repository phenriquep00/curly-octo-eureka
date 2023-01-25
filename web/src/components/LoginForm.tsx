import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { Anchor } from "./Anchor";

import jwt_decode from "jwt-decode";
import { Button } from "./Button";
import { api } from "../lib/axios";
import { UserContext } from "../hooks/UserContext";
import { IUser } from "../utils/types";

export function LoginForm() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [userFromDb, setUserFromDb] = useState<IUser | any>({});

  const submitRef = useRef();

  // handle google login
  const handleCallbackResponse = (response: any) => {
    console.log(response.credential);

    var userObject = jwt_decode(response.credential);
  };

  // handle login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // validate info from form
    if (email.trim() === "" || password.trim() === "") return;

    // get info from db
    await api.get(`/user/${email}`).then((response) => {
      setUserFromDb(response.data);
    });
  };

  // google auth
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

  // everytime the user from db changes (only happens when the submit button is clicked)
  // check if the user exists on t he db, if it does, change the user context to it's value, else
  // tell the user to create a account
  useEffect(() => {
    if (userFromDb.email) {
      //TODO: validate the user password before logging in;
      // the user email is in the database, then, check if the password matches the one in the db

      if (userFromDb.password === password) {
        console.log("login succesful");
        setUser(JSON.stringify(userFromDb));
        window.location.assign("/tasks");
      } else {
        console.log("invalid password");
        return;
      }
    } else {
      console.log("this email is not in the db");
    }
  }, [userFromDb]);

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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            name="email"
            id="email"
          />
          <input
            className="p-4 rounded-md bg-ctp-surface2 border-2 border-ctp-overlay1 text-ctp-text text-md font-medium placeholder:font-medium placeholder:text-ctp-subtext0 focus:bg-ctp-crust focus:ring-2 ring-ctp-green focus:outline-none ring-offset-1 focus:border-none ring-offset-ctp-crust transition-all"
            placeholder="🔑  ********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            name="password"
            id="password"
          />
        </div>

        <Button
          className="p-3 bg-ctp-green w-1/2 rounded font-semibold text-ctp-surface1 border border-ctp-surface1 text-lg hover:bg-opacity-80 hover:text-ctp-text hover:animate-pulse focus:outline-none focus:ring ring-offset-1 focus:border-none ring-ctp-mauve ring-offset-ctp-crust transition-all ease-in-out"
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
          Forgot your password? &nbsp;
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
