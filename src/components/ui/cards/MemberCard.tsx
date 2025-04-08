import * as React from "react";
import { User } from "../../assets";
import { ModalWindow } from "../ModalWindow";

interface MemberCradProps {
  member?: User;
  role?: "admin" | "member";
}

export const MemberCard: React.FC<MemberCradProps> = ({ member, role }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // ### implement handleRemoveMember, after success close modal
  function handleRemoveMember(userId: string | undefined) {}

  return (
    <>
      {/* content of member card */}
      <div>
        {/* name */}
        <h4>
          {member?.firstName} {member?.lastName}
        </h4>
        {/* badge */}
        <div>{member?.role}</div>
        {/* email */}
        <p>{member?.email}</p>
        {/* remove member button */}
        <button onClick={() => setIsOpen(true)}>Remove</button>
      </div>

      {/* confirm remove member modal */}
      <ModalWindow open={isOpen} onClose={() => setIsOpen(false)} type="danger">
        <h4>Remove {member?.firstName} from household</h4>
        <p>Are you sure? This action cannot be undone</p>
        {/* remove button only for admin */}
        {role == "admin" ? (
          <button onClick={() => handleRemoveMember(member?.id)}>Remove</button>
        ) : null}
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </ModalWindow>
    </>
  );
};
