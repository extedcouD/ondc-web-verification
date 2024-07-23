import { Context, createContext } from "react";

interface AppContextProps {
  //   activeTab: string;
  //   setActiveTab: (tab: string) => void;
  //   toggleDarkMode: () => void;
  darkMode: boolean;
  result: { index: number; value: string }[];
  setResult: React.Dispatch<
    React.SetStateAction<{ index: number; value: string }[]>
  >;
  pushResult: (result: string) => void;
}

export const AppContext: Context<AppContextProps> =
  createContext<AppContextProps>({} as AppContextProps);
