import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tasks } from "./pages/Tasks";
import { Calendar } from "./pages/Calendar";
import { Notes } from "./pages/Notes";
import { Settings } from "./pages/Settings";


export function Router() {
  return (
    <Routes>
        {/* Home page */}
      <Route path="/" element={<Home />} />

      {/* content pages */}
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/notes" element={<Notes />} />

      {/* settings page */}
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}