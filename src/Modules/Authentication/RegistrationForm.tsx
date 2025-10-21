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
import { useRegisterMutation } from "@/Redux/Features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
const registerSchema = z
  .object({
    name: z
      .string({ message: "Name must be string" })
      .min(2, { message: "Name is too short. Minimum 2 character long!" })
      .max(50, { message: "Name too long!" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Must be at least 8 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "Must include at least one uppercase letter, one number, and one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Must be at least 8 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "Must include at least one uppercase letter, one number, and one special character"
      ),
    phone: z
      .string({ message: "Phone number must be string" })
      .regex(
        /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
        "Invalid Bangladeshi phone number"
      )
      .optional(),

    address: z
      .string({ message: "Address must be string" })
      .max(200, { message: "{Address cannot exceed 200 characters." })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match!",
    path: ["confirmPassword"],
  });
export default function RegistrationForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
    };
    try {
      const result = await register(userInfo).unwrap();
      toast.success("User Created Successfully!!");
      navigate("/");
      console.log(result);
    } catch (error) {
      console.log(error);
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription className="text-gray-400">
                  This is your public display name.
                </FormDescription>
              </FormItem>
            )}
          />
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
          {/* confirm password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormDescription className="text-gray-400">
                  Match your password!
                </FormDescription>
              </FormItem>
            )}
          />
          {/* phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormDescription className="text-gray-300">
                  Give your phone number.
                </FormDescription>
              </FormItem>
            )}
          />
          {/* address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormDescription className="text-gray-400">
                  Give your address.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-white text-black ">
            Submit
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
          Login
        </Link>
      </div>
    </div>
  );
}
