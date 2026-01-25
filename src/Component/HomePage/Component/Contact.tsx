/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    alert("Your message has been submitted!");
  };

  return (

    <section className="bg-background text-white py-16 px-4">
  <div className="max-w-5xl mx-auto">
    {/* Header */}
    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-3">
        Contact Us
      </h1>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
        Have a question, feedback, or need help? Fill out the form below and
        we’ll get back to you shortly.
      </p>
    </div>

    {/* Form Card */}
    <div className="bg-card rounded-2xl shadow-lg px-8 py-10 max-w-xl mx-auto ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6  w-md mx-auto"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your full name"
                    className="bg-background border-gray-700 focus:border-blue-600"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="bg-background border-gray-700 focus:border-blue-600"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Message</FormLabel>
                <FormControl>
                  <textarea
                    rows={5}
                    placeholder="Write your message..."
                    className="w-full rounded-md bg-background border border-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-600 resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition"
          >
            Send Message
          </Button>
        </form>
      </Form>
    </div>

    {/* Company Info */}
    <div className="text-center text-gray-400 mt-10 space-y-1">
      <p>Email: support@digitalwallet.com</p>
      <p>Phone: +1 (555) 123-4567</p>
      <p>Address: 123 Fintech Avenue, Dhaka, Mirpur</p>
    </div>

    {/* Social Links */}
    <div className="flex justify-center gap-6 mt-6">
      <a href="https://facebook.com" target="_blank" className="hover:text-blue-600 transition">
        <FaFacebook size={22} />
      </a>
      <a href="https://twitter.com" target="_blank" className="hover:text-blue-400 transition">
        <FaTwitter size={22} />
      </a>
      <a href="https://github.com" target="_blank" className="hover:text-gray-300 transition">
        <FaGithub size={22} />
      </a>
      <a href="https://instagram.com" target="_blank" className="hover:text-pink-500 transition">
        <FaInstagram size={22} />
      </a>
      <a href="https://linkedin.com" target="_blank" className="hover:text-blue-700 transition">
        <FaLinkedin size={22} />
      </a>
    </div>
  </div>
</section>

  );
}
