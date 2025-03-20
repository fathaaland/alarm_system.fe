import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email().max(50),
  password: z.string().min(8).max(30),
});

type FormFields = z.infer<typeof schema>;

export const Login: React.FC = () => {
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
    // submit form for login
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {/* tittle and text for login page */}
        <h1>Login</h1>
        <p>Enter your credentials to access your account</p>
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
        {/* submit form button */}
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Login"}
        </button>
        {/* error message from BE */}
        {errors.root && <div>{errors.root.message}</div>}
        {/* link to register */}
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </form>
  );
};
