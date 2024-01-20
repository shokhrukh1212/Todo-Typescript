import { createContext, ReactNode } from "react";
import { User } from "./types/common";
import { UserContextInterface } from "./types/common";

export type UserContextProviderProps = {
  children: ReactNode;
};

const defaultState = {
  userData: { name: "", role: "" },
  setUserData: (userData: User) => {},
} as UserContextInterface;

export const MyContext = createContext(defaultState);
