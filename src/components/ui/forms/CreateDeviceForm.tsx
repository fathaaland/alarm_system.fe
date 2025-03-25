import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3).max(50),
  id: z.string().min(3).max(30),
  type: z.string().min(3).max(30),
});

type FormFields = z.infer<typeof schema>;

export const CreateDeviceForm: React.FC<{ onCancel: () => void }> = ({
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
    } catch (error) {
      // simulated error ###
      setError("root", {
        message: "Device bad",
      });
    }
  };

  return (
    <>
      {/* submit form for creating device */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* tittle and text for create device form */}
          <h1>Add New Device</h1>
          <p>Add a new security device to your household.</p>

          {/* input for device name */}
          <label>Device Name:</label>
          <input
            {...register("name")}
            type="text"
            name="name"
            id="name"
            placeholder="Device Name"
          />
          {/* error message for device name input */}
          {errors.name && <div>{errors.name.message}</div>}

          {/* input for device id */}
          <label>Device Id:</label>
          <input
            {...register("id")}
            type="text"
            name="id"
            id="id"
            placeholder="Device Id"
          />
          {/* error message for device id input */}
          {errors.id && <div>{errors.id.message}</div>}

          {/* input for device type */}
          <label>Device Type:</label>
          <input
            {...register("type")}
            type="text"
            name="type"
            id="type"
            placeholder="Device Type"
          />
          {/* error message for device type input */}
          {errors.type && <div>{errors.type.message}</div>}

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
