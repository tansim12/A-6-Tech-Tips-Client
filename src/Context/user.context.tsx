import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useContext,
  useEffect,
} from "react";


import { TUser } from "../Types/User/user.types";
import { getCurrentUser } from "../Service/Auth/auth.service";

type TProviderValue = {
  user: TUser | null;
  setUser: Dispatch<SetStateAction<TUser | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

const UserContext = createContext<TProviderValue | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleUser = async () => {
      const getUser = await getCurrentUser();
      if (getUser) {
        setUser(getUser?.data);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    };
    handleUser();
  }, [isLoading]);

  // Set the context value
  const values: TProviderValue = {
    user,
    setUser,
    isLoading,
    setIsLoading,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Call Outside provider");
  }
  return context;
};
