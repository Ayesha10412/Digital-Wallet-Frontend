/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  useCashInMutation,
  useRecipientsQuery,
} from "@/Redux/Features/Wallet/wallet.api";

export default function CashInForm() {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      userId: "",
      amount: "",
    },
  });

  const [cashIn, { data, isLoading, error }] = useCashInMutation();
  const { data: userData } = useRecipientsQuery(undefined);
  //console.log(userData?.data);
  const onSubmit = async (formData: any) => {
    //console.log(formData);
    await cashIn({
      userId: formData.userId,
      amount: Number(formData.amount),
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8 p-4">
      <CardHeader>
        <CardTitle className="text-xl text-center">Cash In</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Recipient Dropdown */}
             <div className="space-y-2">
            <Label>Select Recipient</Label>

            <Select
              value={watch("userId")}
              onValueChange={(value) => setValue("userId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a user" />
              </SelectTrigger>

              <SelectContent>
                {userData?.data?.map((user: any) => (
                  <SelectItem key={user._id} value={user._id}>
                    {user.name} 
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              type="number"
              placeholder="Enter amount"
              {...register("amount", { required: true })}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 mt-5">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Processing..." : "Cash In"}
          </Button>

          {data && (
            <p className="text-green-600 text-center">Cash-in successful!</p>
          )}
          {error && (
            <p className="text-red-600 text-center">Something went wrong.</p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
