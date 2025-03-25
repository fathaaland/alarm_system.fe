import * as React from "react";

interface ToastContextProps {
  open: (meassage: string) => void;
  close: (id: number) => void;
}

export const ToastContext = React.createContext<ToastContextProps | null>(null);

export const useToast = () => React.useContext(ToastContext);
