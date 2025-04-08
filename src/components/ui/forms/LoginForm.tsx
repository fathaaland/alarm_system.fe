import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast, useUserStore } from "../../../providers";
import { useMutation } from "@tanstack/react-query";
import { User } from "../../assets";

const schema = z.object({
  email: z.string().email().max(50),
  password: z.string().min(8).max(30),
});

type FormFields = z.infer<typeof schema>;

export const LoginForm: React.FC = () => {
  const { updateUserData, updateAccessToken, updateRefreshToken } =
    useUserStore();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  interface OutputData {
    accessToken: string;
    refreshToken: string;
    user: User;
  }

  // get user and tokens
  const mutation = useMutation({
    mutationFn: async (formData: FormFields) => {
      const { data } = await axios.post<OutputData>(
        "http://localhost:3000/auth/login",
        formData
      );
      return data;
    },
    onSuccess: (data) => {
      updateAccessToken(data.accessToken);
      updateRefreshToken(data.refreshToken);
      updateUserData(data.user);

      // redirect to homepage
      toast?.open("Login was successful");
      navigate("/homepage");
    },
    onError: (error: any) => {
      setError("root", {
        message: error.response?.data?.message || "Login failed",
        // ### implement modal with error
      });
    },
  });

  // form submit function
  const onSubmit: SubmitHandler<FormFields> = async (formData) => {
    mutation.mutate(formData);
  };

  return (
    <>
      {/* submit form for login */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* tittle and text for login page */}
          <h1>Login</h1>
          <p>Enter your credentials to access your account</p>

          {/* input for email */}
          <label>Email:</label>
          <input
            {...register("email")}
            type="email"
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

          {/* error message from BE */}
          {errors.root && <div>{errors.root.message}</div>}

          {/* submit form button */}
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Login"}
          </button>

          {/* link to register */}
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </>
  );
};
