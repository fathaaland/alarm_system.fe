import * as React from "react";
import { ReactNode } from "react";
import { UserProvider } from "../providers";
import { ToastProvider } from "../components/ui";

export const Providers: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <UserProvider>
        <ToastProvider>{children}</ToastProvider>
      </UserProvider>
    </>
  );
};
