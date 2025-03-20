import * as React from "react";
import { User } from "../assets";

interface MemberCradProps {
  member?: User;
}

export const MemberCard: React.FC<MemberCradProps> = ({ member }) => {
  return (
    <>
      <div>
        <h4>
          {member?.firstName} {member?.lastName}
        </h4>
      </div>
    </>
  );
};
