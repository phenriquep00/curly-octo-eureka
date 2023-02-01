import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Home } from "../pages/Home";
import { UserContext } from "./UserContext";

type TPageProvider = PropsWithChildren<{}>;

export const PageContext = createContext<any>("");

export function PageProvider({ children }: TPageProvider) {
  const [currentPage, setCurrentPage] = useState(<Home />);
  
  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
}
