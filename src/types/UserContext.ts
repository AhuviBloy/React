import { createContext } from "react";
import { User } from "../types/user";

export type UserContextType = {
  user: User;
  userDispatch: React.Dispatch<any>;
};

export const UserContext = createContext<UserContextType | null>(null);
