import { CircleX } from "lucide-react";
import * as React from "react";
import { createPortal } from "react-dom";

interface ModalTestProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const ModalTest: React.FC<ModalTestProps> = ({
  children,
  open,
  onClose,
}) => {
  if (!open) return null;
  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 1000 }}>
      {children}
      <button onClick={onClose}>
        <CircleX />
        Close
      </button>
    </div>,
    document.body
  );
};

// ### try to implement clicking outside to trigger onClose
