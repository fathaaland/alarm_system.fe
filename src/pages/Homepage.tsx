import * as React from "react";
import { HouseholdCard, ModalTest, ToolbarHomepage } from "../components/ui";
import { mockHouseholds } from "../components/assets/mockData";
import { Household } from "../components/assets";

/* const households: Household[] = []; */

const households: Household[] = mockHouseholds;

export const Homepage: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <ModalTest open={isOpen} onClose={() => setIsOpen(false)}>
        Fancy Modal
      </ModalTest>
      <ToolbarHomepage />
      {households?.map((household) => (
        <HouseholdCard key={household.id} household={household} />
      ))}
    </>
  );
};
