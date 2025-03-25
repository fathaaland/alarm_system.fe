import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";

const schema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(30),
  confirmPassword: z.string().min(8).max(30),
});

type FormFields = z.infer<typeof schema>;

export const RegisterForm: React.FC = () => {
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
        message: "This email is already taken",
      });
    }
  };

  return (
    <>
      // submit form for register
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* tittle and text for register page */}
          <h1>Create an account</h1>
          <p>Enter your information to create an account</p>
          {/* input for first name */}
          <label>First Name:</label>
          <input
            {...register("firstName")}
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
          />
          {/* error message for first name input */}
          {errors.email && <div>{errors.email.message}</div>}
          {/* input for last name */}
          <label>Last Name:</label>
          <input
            {...register("lastName")}
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
          />
          {/* error message for last name input */}
          {errors.email && <div>{errors.email.message}</div>}
          {/* input for email */}
          <label>Email:</label>
          <input
            {...register("email")}
            type="text"
            name="email"
            id="email"
            placeholder="Email"
          />
          {/* error message for email input */}
          {errors.email && <div>{errors.email.message}</div>}
          {/* input for password */}
          <label>Password:</label>
          <input
            {...register("password")}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          {/* error message for password input */}
          {errors.password && <div>{errors.password.message}</div>}
          {/* input for confirm password */}
          <label>Confirm Password:</label>
          <input
            {...register("confirmPassword")}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Password"
          />
          {/* error message for password input */}
          {errors.password && <div>{errors.password.message}</div>}
          {/* submit form button */}
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Register"}
          </button>
          {/* error message from BE */}
          {errors.root && <div>{errors.root.message}</div>}
          {/* link to login */}
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </>
  );
};
