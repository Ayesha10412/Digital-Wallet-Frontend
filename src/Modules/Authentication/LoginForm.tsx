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
      className={cn(
        "flex flex-col gap-8 text-white text-xl max-w-max mx-auto ",
        className
      )}
      {...props}
    >
      <h1 className="text-3xl font-bold text-center">Login to Your Account</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 py-4">
          {/* Email */}
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

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter Your Password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            {/* Register Link */}
            <div className="text-center text-sm text-gray-300 ">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="underline underline-offset-2 hover:text-blue-400"
              >
                Register
              </Link>
            </div>
            {/* Forgot Password */}
            <div className="text-right text-sm text-gray-300 ">
              <Link to="/resetPassword" className="hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              className="flex-1 justify-center font-semibold bg-blue-600 hover:bg-blue-700 text-white"
            >
              Login
            </Button>
            <Button className="flex-1 justify-center font-semibold bg-white text-blue-600 hover:bg-gray-100 border border-gray-300">
              Login with Google
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
