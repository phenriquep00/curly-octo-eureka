import { FormEvent, useContext, useEffect, useState } from "react";
import { Anchor } from "./Anchor";

import jwt_decode from "jwt-decode";
import { Button } from "./Button";
import { api } from "../lib/axios";
import { UserContext } from "../hooks/UserContext";
import { IUser } from "../utils/types";
import { EmailInput } from "./form/EmailInput";
import ReactLoading from "react-loading";
import { PageContext } from "../hooks/PageContext";
import { Tasks } from "../pages/Tasks";
import { Register } from "../pages/Register";
import { PasswordInput } from "./form/PasswordInput";

export function LoginForm() {
  const { user, setUser } = useContext(UserContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [alertStatus, setAlertStatus] = useState(false);

  const [userFromDb, setUserFromDb] = useState<IUser | any>({});

  const [loading, setLoading] = useState(false);

  // handle google login
  const handleCallbackResponse = async (response: any) => {
    setLoading(true);
    var googleUserObject: any = jwt_decode(response.credential);
    // get email from google
    const googleEmail = googleUserObject.email;

    // TODO: the problem of logging in with google when the account already exists has been solved
    // FIXME: but the user is not beeing automatically logged after logging in with google
    // FIXME: after the account has been just created

    //FIXME: redirect the user imediatly to tasks page if the user context exists

    // check if the email from google is in the database, if so change userFromDb
    // to the user with that email, if not create a account
    // with that email
    await api.get(`/user/${googleEmail}`).then(async (response) => {
      if (response.data === false) {
        // the user is not registered
        // proceed to create the user
        try {
          await api
            .post("/user", {
              username: googleUserObject.name,
              email: googleUserObject.email,
              password: "logged from google auth",
              pictureUrl: googleUserObject.picture,
            })
            .then(() => console.log("new user created"));
        } catch (error) {
          console.log(error);
          setAlertStatus(true);
        } finally {
          setTimeout(() => {
            setUserFromDb(response.data);
          }, 400);
        }
      } else {
        setUserFromDb(response.data);
      }
    });

    setLoading(false);
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
    try {
      await api.get(`/user/${email}`).then((response) => {
        setUserFromDb(response.data);
      });
    } catch (error) {
      console.log(error);
      setAlertStatus(true);
    }
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
      if (
        password === userFromDb.password ||
        userFromDb.password === "logged from google auth"
      ) {
        console.log("passwords match");
        setUser(JSON.stringify(userFromDb));
        setCurrentPage(<Tasks />);
      } else setAlertStatus(true);
    } else if (userFromDb === false) setAlertStatus(true);
  }, [userFromDb]);

  return (
    <div className="flex fixed flex-col items-center p-6 w-[350px] h-[420px] md:w-[700px] md:max-h-[500px] gap-4 rounded-lg shadow-4xl drop-shadow-2xl bg-ctp-crust bg-opacity-90 backdrop-blur-md transition-all">
      <div id="signInDiv" />
      {alertStatus && (
        <span className="bg-ctp-red border-ctp-mauve border-2 p-2 bg-opacity-50 w-full text-center rounded-md text-ctp-text transition-all">
          Couldn't log in, please verify your email and password!
        </span>
      )}
      <form
        onSubmit={handleLogin}
        className="flex items-center gap-4 justify-center rounded-lg flex-col min-w-full"
      >
        <div className="flex flex-col w-full mt-4 mb-4 gap-6">
          <EmailInput action={setEmail} value={email} />
          <PasswordInput action={setPassword} value={password}/>
        </div>

        <Button primary type="submit" title="click here to log in">
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
      <div className="flex fixed bottom-4 w-4/5 flex-col gap-1 border-t border-ctp-overlay0">
        <p className="flex mt-1 items-center justify-center text-ctp-subtext1 font-medium text-base whitespace-nowrap">
          Don't have a account? &nbsp;
          <Button
            title="click here to be redirected to the registration page"
            className="underline text-ctp-peach hover:text-ctp-yellow transition-colors"
            onClick={() => setCurrentPage(<Register />)}
          >
            register here!
          </Button>
        </p>

        <p className="flex mt-1 items-center justify-center text-ctp-subtext1 font-medium text-base whitespace-nowrap">
          Forgot your password? &nbsp;
          <Button
            title="click here to be redirected to the registration page"
            className="underline text-ctp-peach hover:text-ctp-yellow transition-colors"
            onClick={() => {}}
          >
            reset password!
          </Button>
        </p>
      </div>
    </div>
  );
}
