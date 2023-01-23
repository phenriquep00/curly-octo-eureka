import { Anchor } from "./Anchor";

export function LoginForm() {
  return (
    <div className="flex flex-col items-center p-3 min-w-[350px] gap-4 min-h-[400px] rounded-lg shadow-2xl drop-shadow-2xl bg-ctp-surface0">
      <div> google auth </div>
      <form className="flex items-center gap-4 justify-center rounded-lg flex-col w-[90%] bg-ctp-surface1 p-4">
        <div className="flex flex-col w-full gap-6">
          <input
            className="p-4 rounded-md bg-ctp-surface2 border border-ctp-overlay1 text-ctp-text text-md font-medium placeholder:font-medium placeholder:text-ctp-subtext0"
            placeholder="johndoe@somemail.com"
            type="email"
            name="email"
            id="email"
          />
          <input
            className="p-4 rounded-md bg-ctp-surface2 border border-ctp-overlay1 text-ctp-text text-md font-medium placeholder:font-medium placeholder:text-ctp-subtext0"
            placeholder="********"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          className="p-3 bg-ctp-green w-1/2 rounded font-semibold text-ctp-surface1 border border-ctp-surface1 text-lg hover:bg-opacity-80 hover:text-ctp-text transition-colors"
          type="submit"
        >
          login
        </button>
      </form>
      <div>
        <Anchor to="#">register</Anchor>
        <Anchor to="#">reset password</Anchor>
      </div>
    </div>
  );
}
