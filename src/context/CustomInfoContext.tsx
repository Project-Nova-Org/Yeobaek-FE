import React, { createContext, useContext, useState, useCallback } from "react";
import type { UserInfo } from "@/types/navigation/shared";

type CustomInfoContextValue = {
  savedCustomInfo: UserInfo | null;
  setSavedCustomInfo: (data: UserInfo) => void;
};

const CustomInfoContext = createContext<CustomInfoContextValue | null>(null);

export function CustomInfoProvider({ children }: { children: React.ReactNode }) {
  const [savedCustomInfo, setSavedCustomInfoState] = useState<UserInfo | null>(
    null
  );

  const setSavedCustomInfo = useCallback((data: UserInfo) => {
    setSavedCustomInfoState(data);
  }, []);

  const value: CustomInfoContextValue = {
    savedCustomInfo,
    setSavedCustomInfo,
  };

  return (
    <CustomInfoContext.Provider value={value}>
      {children}
    </CustomInfoContext.Provider>
  );
}

export function useCustomInfo() {
  const ctx = useContext(CustomInfoContext);
  if (ctx == null) {
    throw new Error("useCustomInfo must be used within CustomInfoProvider");
  }
  return ctx;
}
