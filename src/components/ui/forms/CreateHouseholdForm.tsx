import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3).max(50),
});

type FormFields = z.infer<typeof schema>;

export const CreateHouseholdForm: React.FC<{ onCancel: () => void }> = ({
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
      // simulated call ###
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      /* onCancel(); ### if response 200 close modal and display toast*/
    } catch (error) {
      // simulated error ###
      setError("root", {
        message: "Household fucked",
      });
    }
  };

  return (
    <>
      {/* submit form for creating household */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* tittle and text for login page */}
          <h1>Add New Household</h1>
          <p>Create a new household to manage your security devices.</p>

          {/* input for household name */}
          <label>Household Name:</label>
          <input
            {...register("name")}
            type="text"
            name="name"
            id="name"
            placeholder="Household Name"
          />
          {/* error message for household name input */}
          {errors.name && <div>{errors.name.message}</div>}

          {/* error message from BE */}
          {errors.root && <div>{errors.root.message}</div>}

          {/* submit form button */}
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Create"}
          </button>
          {/* cancel button */}
          <button onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
