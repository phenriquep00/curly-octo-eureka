import { Header } from "../components/Header";
import { RegisterForm } from "../components/RegisterForm";

export function Register() {
  return (
    <div className="flex w-screen h-screen">
      <Header />
      <main
        style={{
          backgroundImage: "url(/bg-texture-2.svg)",
        }}
        className="flex flex-1 mt-14 items-center justify-center bg-ctp-base text-white"
      >
        <RegisterForm />
      </main>
    </div>
  );
}
