import { Header } from "../components/Header";
import { LoginForm } from "../components/LoginForm";

export function Home() {
    return (
        <div className="flex w-screen h-screen">
            <Header />
            <main 
            style={{
                backgroundImage: "url(/bg-texture-2.svg)"
            }}
            className="flex flex-col gap-8 flex-1 mt-14 items-center justify-center  text-white">
                <LoginForm />
            </main>
        </div>
    )
}