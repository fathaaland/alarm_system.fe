import * as React from "react";
import { Household } from "../components/assets";
import { ToolbarHomepage } from "../components/ui/toolbars";
import { HouseholdCard } from "../components/ui/cards";
import { useFetchData } from "../providers";

export const Homepage: React.FC = () => {
  const { getData } = useFetchData();

  interface DtoOut {
    success: boolean;
    data: Household[];
  }

  const {
    data: response,
    isLoading,
    error,
  } = getData<DtoOut>("households", "/user");

  const households = response?.data || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading households. Please try again.</div>;

  return (
    <>
      <ToolbarHomepage />
      {households.length === 0 ? (
        <div>Currently no household, create new one</div>
      ) : (
        households?.map((household) => (
          <HouseholdCard key={household._id} household={household} />
        ))
      )}
    </>
  );
};

// ### implement error handling with modal
// ### loading spinner
