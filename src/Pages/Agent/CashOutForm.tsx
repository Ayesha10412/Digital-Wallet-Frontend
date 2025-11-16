/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useCashOutMutation,
  useRecipientsQuery,
} from "@/Redux/Features/Wallet/wallet.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

// ---- Validation Schema ----
const schema = z.object({
  userId: z.string().min(1, "User ID is required"),
  amount: z.number().min(1, "Amount must be at least 1"),
});

type CashOutFormType = z.infer<typeof schema>;

export default function CashOutForm() {
  const [cashOut, { isLoading }] = useCashOutMutation();
  const { data: recipientData } = useRecipientsQuery(undefined);
  console.log(recipientData);
  const navigate = useNavigate();
  const form = useForm<CashOutFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: "",
      amount: 0,
    },
  });

  const onSubmit = async (values: CashOutFormType) => {
    try {
      const res = await cashOut(values).unwrap();
      toast.success("Cash-Out Successful!");
      console.log("Response:", res);
      navigate("/agent/profile");
      form.reset();
    } catch (err: any) {
      alert(err?.data?.message || "Cash-out failed");
      console.log(err);
    }
  };

  return (
    <Card className="max-w-md px-8 mx-auto mt-10 shadow-lg">
      <CardHeader>
        <CardTitle className="font-serif text-xl">Cash Out</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 space-x-10 "
          >
            {/* User ID */}
            {/* <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter user ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> User </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border text-gray-500 text-sm rounded-md h-10 px-3"
                    >
                      <option value="">Select a user</option>

                      {recipientData?.data?.map((user: any) => (
                        <option key={user._id} value={user._id}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Cash Out"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
