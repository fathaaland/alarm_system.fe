import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AddMemberCard } from "../cards";
import { User } from "../../assets";
import { mockUsers } from "../../assets/mockData/users";

const schema = z.object({
  searchParams: z.string().max(50),
});

type FormFields = z.infer<typeof schema>;

export const AddMemberForm: React.FC<{ onCancel: () => void }> = ({
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  // form submit function
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // send post request to BE
    try {
      // simulated call ### add users fetch
      // has to filter members already in household
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      // simulated error ###
      setError("root", {
        message: "User bad",
      });
    }
  };

  // ### later delete when fetching is implemented
  const users = mockUsers;

  return (
    <>
      {/* submit form for creating device */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* tittle and text for searching users */}
          <h1>Add Member To Household</h1>
          <p>Invite a user to join your household.</p>

          {/* input for device name */}
          <label>Search for users:</label>
          <input
            {...register("searchParams")}
            type="text"
            name="searchParams"
            id="searchParams"
            placeholder="Search users"
          />
          {/* error message for device name input */}
          {errors.searchParams && <div>{errors.searchParams.message}</div>}

          {/* error message from BE */}
          {errors.root && <div>{errors.root.message}</div>}

          {/* submit form button */}
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Search"}
          </button>
        </div>
      </form>

      {/* users mapped */}
      <div>
        {users?.map((user: User) => (
          <AddMemberCard key={user.id} member={user} />
        ))}
      </div>

      {/* cancel button */}
      <button onClick={onCancel} disabled={isSubmitting}>
        Cancel
      </button>
    </>
  );
};
