import { createContext, useContext } from "react";

type SettingsContextType = {
  settings: any;
  updateSettings: (data?: any) => void;
  resetSettings: () => void;
  address: string;
  updateAddress: (data?: any) => void;
  location: string;
  updateLocation: (data?: any) => void;
};

export const SettingsContext = createContext<SettingsContextType>(
  {} as SettingsContextType
);

export const useSettings = () => useContext(SettingsContext);
