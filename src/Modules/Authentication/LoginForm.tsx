/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription className="text-gray-400">
                  Enter Your email
                </FormDescription>
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
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormDescription className="text-gray-400">
                  Type your password here!
                </FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-white text-black ">
            Login
          </Button>
        </form>
      </Form>
      <div className="relative text-center text-sm after:absolute after4:insert-0 after:top-1/2 after:z-0 after:flex after:items-center">
        <span className="relative z-10 bg-background rounded-lg px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
      <div>
        <button
          type="button"
          className="max-w-lg px-4 text-sm py-1.5 font-bold items-center rounded-xl bg-white text-black"
        >
          Login with Google
        </button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
