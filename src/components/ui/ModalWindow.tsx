import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  type?: "danger" | "error" | "default";
}

export const ModalWindow: React.FC<ModalProps> = ({
  children,
  open,
  onClose,
  type = "default",
}) => {
  if (!open) return null;
  return createPortal(
    <div
      className={type}
      style={{
        position: "relative",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "grey",
        width: "500px",
        height: "400px",
      }}
    >
      <X onClick={onClose} />
      {children}
    </div>,
    document.body
  );
};

// ### try to implement clicking outside to trigger onClose
// ### implement type styling
