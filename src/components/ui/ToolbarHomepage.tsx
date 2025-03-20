import * as React from "react";
import { CirclePlus } from "lucide-react";

export const ToolbarHomepage: React.FC = () => {
  return (
    <>
      <h1>My Households</h1>
      <button>
        <CirclePlus />
        Add Household
      </button>
    </>
  );
};
