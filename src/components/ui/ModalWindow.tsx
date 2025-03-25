import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const ModalWindow: React.FC<ModalProps> = ({
  children,
  open,
  onClose,
}) => {
  if (!open) return null;
  return createPortal(
    <div
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
