"use client";

import { z } from "zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "./error-text";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});
type SignInSchemaType = z.infer<typeof SignInSchema>;

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({ resolver: zodResolver(SignInSchema) });
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    try {
      const response = await axios.post("/api/sign-in", data);
      router.push("/categories");
      toast(response.data.message || "");
    } catch (error: any) {
      toast(error.response.data.error || "", { type: "error" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 grid w-full grid-cols-1 gap-5"
    >
      <div className="flex flex-col items-start justify-start gap-2">
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          className="w-full rounded border border-gray-300 px-4 py-2 placeholder:text-gray-400"
          placeholder="Email"
          {...register("email")}
          type="email"
        />
        {errors.email && (
          <ErrorMessage
            message={errors.email.message ? errors.email.message : ""}
          />
        )}
      </div>

      <div className="flex flex-col items-start justify-start gap-2">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          className="w-full rounded border border-gray-300 px-4 py-2 placeholder:text-gray-400"
          placeholder="Password"
          {...register("password")}
          type="password"
        />
        {errors.password && (
          <ErrorMessage
            message={errors.password.message ? errors.password.message : ""}
          />
        )}
      </div>

      <div className="mt-2 flex flex-col items-center justify-center">
        <button
          type="submit"
          className="w-full rounded bg-black px-4 py-2 text-white"
        >
          LOGIN
        </button>
      </div>
    </form>
  );
}

export default SignInForm;
