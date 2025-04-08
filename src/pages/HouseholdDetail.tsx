import * as React from "react";
import { useParams } from "react-router-dom";
import { Household } from "../components/assets";
import { Tabs } from "../components/ui/tabs";
import { useFetchData } from "../providers";

export const HouseholdDetail: React.FC = () => {
  const { householdId } = useParams<{ householdId: string }>();
  const { getData } = useFetchData();

  interface DtoOut {
    success: boolean;
    data: Household;
  }

  const {
    data: response,
    isLoading,
    error,
  } = getData<DtoOut>("household", `/user/${householdId}`);

  const household = response?.data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading household. Please try again.</div>;

  return (
    <>
      <h1>{household?.name}</h1>{" "}
      <p>Manage your household devices, members, and security settings</p>
      <Tabs data={household} />
    </>
  );
};
