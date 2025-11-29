/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/Redux/Features/auth/auth.api";
import type React from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const form = useForm({});
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();
      if (res.success) {
        toast.success("User Created Successfully!!");
        navigate("/");
      }
      console.log(res);
    } catch (err: any) {
      console.log(err);

      if (err.data.message === "Password does not match") {
        toast.error("Invalid Credentials");
      }
      if (err.data.message === "User is not verified") {
        toast.error("Your account is no0t verified");
      }
    }
  };
  return (
    <div
      className={cn("flex flex-col gap-6 text-white text-xl", className)}
      {...props}
    >
      <h1 className="text-3xl text-white font-bold text-center">
        Register Your Account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Password" {...field} />
                </FormControl>
                {/* FIXED LOGIN BUTTON */}
                <Button type="submit" className="w-full">
                  Login
                </Button>{" "}
                <Link
                  to="/resetPassword"
                  className="text-gray-300 text-xs text-right block"
                >
                  Forgot password?
                </Link>
              </FormItem>
            )}
          />

          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          <button className="w-md mt-4 py-2 text-sm rounded-xl bg-background text-blue-600 font-bold">
            Continue with Google
          </button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Already have an account?
        <Link
          to="/register"
          className="text-gray-300 underline underline-offset-4"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
