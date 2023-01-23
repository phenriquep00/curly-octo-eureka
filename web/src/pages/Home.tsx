import { Header } from "../components/Header";

export function Home() {
    return (
        <div className="flex w-screen h-screen">
            <Header />
            <main className="flex flex-1 mt-14 items-center justify-center bg-black text-white">
                <h1>Home</h1>
            </main>
        </div>
    )
}