import * as React from "react";
import { CirclePlus } from "lucide-react";
import { ModalWindow } from "../ModalWindow";
import { CreateHouseholdForm } from "../forms/CreateHouseholdForm";

export const ToolbarHomepage: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <h1>My Households</h1>
      {/* button for add household modal */}
      <button onClick={() => setIsOpen(true)}>
        <CirclePlus />
        Add Household
      </button>

      {/* modal for create household form */}
      <ModalWindow open={isOpen} onClose={() => setIsOpen(false)}>
        <CreateHouseholdForm onCancel={() => setIsOpen(false)} />
      </ModalWindow>
    </>
  );
};
