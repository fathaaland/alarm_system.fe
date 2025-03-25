import * as React from "react";

import { CirclePlus } from "lucide-react";
import { User } from "../../assets";
import { MemberCard } from "../cards";
import { ModalWindow } from "../ModalWindow";
import { AddMemberForm } from "../forms";

interface MembersProps {
  members?: User[];
}

export const MembersTab: React.FC<MembersProps> = ({ members }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      {/* members tab toolbar */}
      <h3>Members</h3>
      <button onClick={() => setIsOpen(true)}>
        <CirclePlus />
        Add Member
      </button>
      {/* member cards */}
      {members?.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}

      <ModalWindow open={isOpen} onClose={() => setIsOpen(false)}>
        <AddMemberForm onCancel={() => setIsOpen(false)} />
      </ModalWindow>
    </>
  );
};
