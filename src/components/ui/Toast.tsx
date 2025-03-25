import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { ToastContext } from "../../providers";

interface ToastProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ children, onClose }) => {
  return createPortal(
    <div
      style={{
        position: "relative",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "grey",
        width: "200px",
        height: "50px",
      }}
    >
      <X onClick={onClose} />
      {children}
    </div>,
    document.body
  );
};

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastType {
  message: string;
  id: number;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastType[]>([]);

  function openToast(message: string) {
    const newToast = {
      id: Date.now(),
      message: message,
    };
    setToasts((previousToasts) => [...previousToasts, newToast]);
  }

  function closeToast(id: number) {
    setToasts((previousToasts) =>
      previousToasts.filter((toast) => toast.id != id)
    );
  }

  const contextValue = React.useMemo(
    () => ({
      open: openToast,
      close: closeToast,
    }),
    []
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toasts &&
        toasts.map((toast) => {
          return (
            <Toast key={toast.id}  onClose={() => closeToast(toast.id)}>
              {toast.message}
            </Toast>
          );
        })}
    </ToastContext.Provider>
  );
}
