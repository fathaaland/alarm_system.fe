import * as React from "react";
import { ReactNode } from "react";
import { ToastProvider } from "../components/ui";

export const Providers: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <ToastProvider>{children}</ToastProvider>
    </>
  );
};
