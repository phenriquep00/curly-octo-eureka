import { Header } from "../components/Header";
import { LoginForm } from "../components/LoginForm";

export function Home() {
    return (
        <div className="flex w-screen h-screen">
            <Header />
            <main className="flex flex-col gap-8 flex-1 mt-14 items-center justify-center bg-ctp-base text-white">
                <h1>Home page</h1>
                <LoginForm />
            </main>
        </div>
    )
}