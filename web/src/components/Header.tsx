import { CalendarPlus, ListChecks, NotePencil } from "phosphor-react";
import { Anchor } from "./Anchor";
import { Logo } from "../assets/Logo";

export function Header() {
  return (
    <header className="fixed px-4 shadow-3xl drop-shadow-2xl flex items-center justify-between top-0 bg-ctp-crust w-screen h-14">
      <Logo />
      <section className="">
        <ul className="flex gap-5">
          <li>
            <Anchor
              href="/tasks"
              className="flex items-center justify-center text-ctp-subtext1 font-medium text-lg hover:text-ctp-flamingo transition-colors"
            >
              <div className="flex items-center gap-1">
                <ListChecks size={20} />
                Tasks
              </div>
            </Anchor>
          </li>

          <li>
            <Anchor
              href="/calendar"
              className="flex items-center justify-center text-ctp-subtext1 font-medium text-lg hover:text-ctp-flamingo transition-colors"
            >
              <div className="flex items-center gap-1">
                <CalendarPlus size={20} />
                Calendar
              </div>
            </Anchor>
          </li>
          <li>
            <Anchor
              href="/notes"
              className="flex items-center justify-center text-ctp-subtext1 font-medium text-lg hover:text-ctp-flamingo transition-colors"
            >
              <div className="flex items-center gap-1">
                <NotePencil size={20} />
                Notes
              </div>
            </Anchor>
          </li>
        </ul>
      </section>
    </header>
  );
}
