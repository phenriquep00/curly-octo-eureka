import { CalendarPlus, ListChecks, NotePencil } from "phosphor-react";
import { Anchor } from "./Anchor";
import { Logo } from "../assets/Logo";

export function Header() {
  return (
    <header className="fixed px-4  flex items-center justify-between top-0 bg-ctp-crust w-screen h-14">
      <Logo />
      <section className="">
        <ul className="flex gap-5">
          <li>
            <Anchor to="/todo">
              <div className="flex items-center gap-1">
                <ListChecks size={20} />
                ToDo
              </div>
            </Anchor>
          </li>

          <li>
            <Anchor to="/calendar">
              <div className="flex items-center gap-1">
                <CalendarPlus size={20} />
                Calendar
              </div>
            </Anchor>
          </li>
          <li>
            <Anchor to="/notes">
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
