import * as React from "react";
import { User } from "../../assets";

interface AddMemberCardProps {
  member?: User;
}

// ### create handleAddMember function

export const AddMemberCard: React.FC<AddMemberCardProps> = ({ member }) => {
  return (
    <>
      <div>
        <h4>
          {member?.firstName} {member?.lastName}
        </h4>
        <button onClick={() => handleAddMember(member?.id)}>Add</button>
      </div>
    </>
  );
};
