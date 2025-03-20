import * as React from "react";
import { User } from "../assets";
import { MemberCard } from "./MemberCard";
import { CirclePlus } from "lucide-react";

interface MembersProps {
  members?: User[];
}

export const MembersTab: React.FC<MembersProps> = ({ members }) => {
  return (
    <>
      {/* members tab toolbar */}
      <h3>Members</h3>
      <button>
        <CirclePlus />
        Add Member
      </button>
      {/* member cards */}
      {members?.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </>
  );
};
