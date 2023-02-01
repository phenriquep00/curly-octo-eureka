import { useContext, useState } from "react";

import { Home } from "./pages/Home";
import { Tasks } from "./pages/Tasks";
import { Notes } from "./pages/Notes";
import { Calendar } from "./pages/Calendar";
import { Settings } from "./pages/Settings";
import { PageContext } from "./hooks/PageContext";

export function App() {
  const {currentPage, setCurrentPage} = useContext(PageContext);

  return currentPage;
}
