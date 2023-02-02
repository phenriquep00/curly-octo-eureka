import { Header } from "../components/Header";
import { RegisterForm } from "../components/RegisterForm";

export function Register() {
    return (
        <div className="flex w-screen h-screen">
            <Header />
            <main className="flex flex-1 mt-14 items-center justify-center bg-ctp-base text-white">
                <RegisterForm />
            </main>
        </div>
    )
}