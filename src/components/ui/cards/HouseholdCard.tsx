import * as React from "react";
import { Link } from "react-router-dom";
import { Dot } from "lucide-react";
import { Household } from "../../assets";

interface HouseholdCardProps {
  household: Household;
}

export const HouseholdCard: React.FC<HouseholdCardProps> = ({ household }) => {
  return (
    <div>
      {/* household name */}
      <h2>{household.name}</h2>
      {/* household number of devices and members */}
      <p>
        {household.devices.length}{" "}
        {household.devices.length === 1 ? "device" : "devices"}
      </p>
      <Dot />
      <p>
        {household.members.length}{" "}
        {household.members.length === 1 ? "member" : "members"}
      </p>
      {/* household alarm active info */}
      <Dot />

      {/* ### <p>{household.active ? "Alarm Activated" : "Alarm Deactivated"}</p> */}
      {/* household link to detail */}
      <Link to={`/household-detail/${household._id}`}>
        <div>
          <p>Click to view details</p>
        </div>
      </Link>
    </div>
  );
};

// ### fix conditional rendering with plural devices and members
