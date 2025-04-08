import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useFetchData, useToast } from "../../../providers";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  name: z.string().min(3).max(50),
});

type FormFields = z.infer<typeof schema>;

interface DtoOut {
  success: boolean;
}

export const CreateHouseholdForm: React.FC<{
  onCancel: () => void;
}> = ({ onCancel }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { postData } = useFetchData();
  const toast = useToast();
  const queryClient = useQueryClient();

  const createHouseholdMutation = postData<DtoOut, FormFields>(
    "/household/create"
  );

  // form submit function
  const onSubmit: SubmitHandler<FormFields> = async (inputData) => {
    try {
      const response = await createHouseholdMutation.mutateAsync(inputData);

      if (response.success) {
        onCancel();
        toast?.open("Household was created successfully");
        queryClient.invalidateQueries({ queryKey: ["households"] });
        // ### refresh homepage after creating household
      }
    } catch (error) {
      setError("root", {
        message: "Error creating household. Please try again.",
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
