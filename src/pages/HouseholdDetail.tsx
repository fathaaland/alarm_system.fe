import * as React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Household } from "../components/assets";
import { mockHousehold } from "../components/assets/mockData";
import { Tabs } from "../components/ui/tabs";

const mockData: Household = mockHousehold;

export const HouseholdDetail: React.FC = () => {
  const { householdId } = useParams<{ householdId: string }>();

  // ### uncomment and use fetch when endpoint is done
  /*  const {
    data: householdData,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["households", householdId],
    queryFn: async () => {
      if (!householdId) throw new Error("No householdId provided");
      const response = await fetch(`/api/households/${householdId}`); // ### update to correct endpoint
      if (!response.ok) throw new Error("Failed to fetch household data");
      return (await response.json()) as Household;
    },
    enabled: !!householdId,
  }); */

  /* if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error loading household data</p>; */ // ### manage what happens when loading fetching data and when an error occurs

  return (
    <>
      {/* ### change mockData to householdData when endpoint is done */}
      <h1>{mockData?.name}</h1>{" "}
      <p>Manage your household devices, members, and security settings</p>
      {/* ### change mockData to householdData when endpoint is done */}
      <Tabs data={mockData} />
    </>
  );
};
