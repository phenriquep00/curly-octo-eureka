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
              title="jump to tasks page"
              className="flex items-center justify-center text-ctp-subtext1 font-semibold text-lg hover:text-ctp-flamingo transition-colors"
            >
              <div className="flex items-center gap-1">
                <ListChecks size={20} weight="bold"/>
                Tasks
              </div>
            </Anchor>
          </li>

          <li>
            <Anchor
              href="/calendar"
              title="jump to calendar page"
              className="flex items-center justify-center text-ctp-subtext1 font-semibold text-lg hover:text-ctp-flamingo transition-colors"
            >
              <div className="flex items-center gap-1">
                <CalendarPlus size={20} weight="bold"/>
                Calendar
              </div>
            </Anchor>
          </li>
          <li>
            <Anchor
              href="/notes"
              title="jump to notes page"
              className="flex items-center justify-center text-ctp-subtext1 font-semibold text-lg hover:text-ctp-flamingo transition-colors"
            >
              <div className="flex items-center gap-1">
                <NotePencil size={20} weight="bold"/>
                Notes
              </div>
            </Anchor>
          </li>
        </ul>
      </section>
    </header>
  );
}
