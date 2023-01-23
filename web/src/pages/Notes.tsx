import { Header } from "../components/Header";

export function Notes() {
  return (
    <div className="flex w-screen h-screen">
      <Header />
      <main className="flex flex-1 mt-14 items-center justify-center bg-ctp-base text-white">
        <h1>Notes page</h1>
      </main>
    </div>
  );
}
