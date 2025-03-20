import * as React from "react";
import { ReactNode } from "react";
import { ToastProvider, UserProvider } from "../providers";

export const Providers: React.FC<{ children?: ReactNode }> = ({ children }) => {
  // put context providers here...

  return (
    <>
      <UserProvider />
      <ToastProvider />
      {children}
    </>
  );
};
