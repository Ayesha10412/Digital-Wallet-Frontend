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
      className={cn("flex flex-col gap-6 text-white text-xl ", className)}
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
                  <Input
                    placeholder="This is your public display name."
                    {...field}
                  />
                </FormControl>
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
                  <Input placeholder="Enter Your email" {...field} />
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
                  <Input placeholder="Type your password here!" {...field} />
                </FormControl>
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
                  <Input placeholder="Match your password!" {...field} />
                </FormControl>
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
                  <Input placeholder="Give your phone number." {...field} />
                </FormControl>
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
                  <Input placeholder="Give your address." {...field} />
                </FormControl>
                <div className="text-sm text-left  text-gray-300  ">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="underline underline-offset-2 hover:text-blue-400"
                  >
                    Register
                  </Link>
                </div>
              </FormItem>
            )}
          />

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
