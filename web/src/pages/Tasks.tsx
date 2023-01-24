import { useContext, useState } from "react";
import { Header } from "../components/Header";
import { UserContext } from "../hooks/UserContext";
import { IUser } from "../utils/types";

export function Tasks() {

  const {user, setUser} = useContext(UserContext);
  const [localUser, setLocalUser] = useState<IUser>(JSON.parse(user));

  return (
    <div className="flex w-screen h-screen">
      <Header />
      <main className="flex flex-1 mt-14 items-center justify-center bg-ctp-base text-white">
        <h1>Tasks page</h1>
        <h2>{localUser.username}</h2>
      </main>
    </div>
  );
}
