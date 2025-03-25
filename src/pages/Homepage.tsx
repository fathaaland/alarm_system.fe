import * as React from "react";
import { mockHouseholds } from "../components/assets/mockData";
import { Household } from "../components/assets";
import { ToolbarHomepage } from "../components/ui/toolbars";
import { HouseholdCard } from "../components/ui/cards";

/* const households: Household[] = []; */

const households: Household[] = mockHouseholds;

export const Homepage: React.FC = () => {
  return (
    <>
      <ToolbarHomepage />
      {households?.map((household) => (
        <HouseholdCard key={household.id} household={household} />
      ))}
    </>
  );
};
