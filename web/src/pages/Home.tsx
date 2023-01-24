import { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { LoginForm } from "../components/LoginForm";
import { UserContext } from "../hooks/UserContext";

export function Home() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      window.location.assign("/tasks");
    }
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <Header />
      <main
        style={{
          backgroundImage: "url(/bg-texture-2.svg)",
        }}
        className="flex flex-col gap-8 flex-1 mt-14 items-center justify-center  text-white"
      >
        <LoginForm />
      </main>
    </div>
  );
}
