/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserInfoQuery } from "@/Redux/Features/auth/auth.api";
import { useCashInMutation } from "@/Redux/Features/Wallet/wallet.api";
import React, { useState } from "react";
import { toast } from "sonner";

export default function CashInForm() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [cashIn, { isLoading }] = useCashInMutation();
  const { data: userInfo } = useUserInfoQuery(undefined);
  const agent = userInfo?.data;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email || !amount) {
        return toast.error("All fields are required!");
      }
      const payload = {
        agentId: agent?._id,
        userId: email,
        amount: Number(amount),
      };
      console.log(payload);
      await cashIn(payload).unwrap();
      toast.success("Money added successfully");
      setEmail("");
      setAmount("");
    } catch (err: any) {
      toast.error(err.data?.message || "Cash in failed!");
    }
  };

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Add Money"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
