/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserInfoQuery } from "@/Redux/Features/auth/auth.api";
import { useAddMoneyMutation } from "@/Redux/Features/Wallet/wallet.api";

import React, { useState } from "react";
import { toast } from "sonner";

export default function AddMoney() {
  const [amount, setAmount] = useState("");
  const [addMoney, { isLoading }] = useAddMoneyMutation();
  const { data: userInfo, isLoading: userLoading } =
    useUserInfoQuery(undefined);
  const user = userInfo?.data;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?._id) {
      return toast.error("User info not found!");
    }
    if (!amount) {
      return toast.error("Please enter your amount!");
    }
    try {
      const data = {
        amount: Number(amount),
      };
      console.log(data);
      await addMoney(data).unwrap();
      toast.success("Money added successfully");
      setAmount("");
    } catch (err: any) {
      toast.error(err.data?.message || "Cash in failed!");
    }
  };
  if (userLoading) {
    return <p className="text-center mt-4">Loading user info...</p>;
  }
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-shadow-pink-700 font-bold">
          Cash-In (Add Money)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">User Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter user email"
                value={user?.email}
                readOnly
                className="bg-gray-400 cursor-not-allowed"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={isLoading || userLoading}
            >
              {isLoading ? "Processing..." : "Add Money"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
