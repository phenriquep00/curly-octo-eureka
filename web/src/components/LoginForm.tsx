import { FormEvent, useContext, useEffect, useState } from "react";
import { Anchor } from "./Anchor";

import jwt_decode from "jwt-decode";
import { Button } from "./Button";
import { api } from "../lib/axios";
import { UserContext } from "../hooks/UserContext";
import { IUser } from "../utils/types";
import { EmailInput } from "./form/EmailInput";
import ReactLoading from "react-loading";

export function LoginForm() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [alertStatus, setAlertStatus] = useState(false);

  const [userFromDb, setUserFromDb] = useState<IUser | any>({});

  const [loading, setLoading] = useState(false);

  // handle google login
  const handleCallbackResponse = async (response: any) => {
    var googleUserObject: any = jwt_decode(response.credential);
    // get email from google
    const googleEmail = googleUserObject.email;

    // TODO: fix the login in case the user has to be created first
    // possible problems: the setUserFromDb is forcing the useEffect to run berofe the user gets created
    // because it is returning undefined in the log

    // check if the email from google is in the database, if so change userFromDb
    // to the user with that email, if not create a account
    // with that email
    await api.get(`/user/${googleEmail}`).then(async (response) => {
      if (response.data === false) {
        // the user is not registered
        // proceed to create the user
        // TODO: add a try catch block
        await api
          .post("/user", {
            username: googleUserObject.name,
            email: googleUserObject.email,
            password: "logged from google auth",
            pictureUrl: googleUserObject.picture,
          })
          .then(() => console.log("new user created"))
      }
      setUserFromDb(response.data);
    });
  };

  // handle login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // validate info from form
    if (email.trim() === "" || password.trim() === "") {
      setLoading(false);
      setAlertStatus(true);
      return;
    }

    // get info from db
    await api.get(`/user/${email}`).then((response) => {
      setUserFromDb(response.data);
    });
    setLoading(false);
  };

  // google auth
  useEffect(() => {
    /* global google */
    // @ts-ignore
    if (google) {
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
    }
  }, []);

  useEffect(() => {
    console.log(userFromDb.email);
    if (userFromDb.id) {
      if (password === userFromDb.password) {
        console.log("passwords match");
        setUser(JSON.stringify(userFromDb));
        window.location.assign("/tasks");
      } else setAlertStatus(true);
    } else if (userFromDb === false) setAlertStatus(true);
  }, [userFromDb]);

  return (
    <div className="flex fixed flex-col items-center justify-between p-6 w-[350px] h-[420px] md:w-[700px] md:h-[500px] gap-4 rounded-lg shadow-4xl drop-shadow-2xl bg-ctp-crust bg-opacity-90 backdrop-blur-md transition-all">
      <div id="signInDiv" />
      {alertStatus && (
        <span className="bg-ctp-red border-ctp-mauve border-2 p-2 bg-opacity-50 w-full text-center rounded-md text-ctp-text transition-all">
          Couldn't log in, please verify your email and password!
        </span>
      )}
      <form
        onSubmit={handleLogin}
        className="flex items-center gap-4 justify-center rounded-lg flex-col w-full p-4"
      >
        <div className="flex flex-col w-full gap-6">
          <EmailInput action={setEmail} value={email} />
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
          {loading ? (
            <div className="flex justify-center items-center ">
              <ReactLoading type={"cylon"} width={"40px"} height={"30px"} />
            </div>
          ) : (
            "Login"
          )}
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
