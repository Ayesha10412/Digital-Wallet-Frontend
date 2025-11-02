/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserInfoQuery } from "@/Redux/Features/auth/auth.api";
import {
  useRecipientsQuery,
  useSendMoneyMutation,
} from "@/Redux/Features/Wallet/wallet.api";
import React, { useState } from "react";
import { toast } from "sonner";

export default function SendMoney() {
  const [amount, setAmount] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const [sendMoney, { isLoading }] = useSendMoneyMutation();
  const { data: userInfo, isLoading: userLoading } =
    useUserInfoQuery(undefined);
  const { data } = useRecipientsQuery(undefined);
  console.log(data);
  console.log("Users:", data?.data);
  const recipientInfo = data?.data;
  const user = userInfo?.data;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?._id) {
      return toast.error("User is not found!");
    }
    if (!selectedUserId) {
      return toast.error("Please select a user!");
    }
    if (!amount) {
      return toast.error("Please provide amount you want to withdrawn!");
    }
    try {
      const sendData = {
        toUserId: selectedUserId,
        amount: Number(amount),
      };
      console.log(sendData);
      await sendMoney(sendData).unwrap();
      toast.success("Send Money Successfully!");
      setAmount("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (userLoading) {
    return <p className="text-center mt-4">Loading user info...</p>;
  }
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-shadow-pink-700 font-bold">
          Send Money To another User Wallet
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
            {/* Recipient selection */}
            <div className="grid gap-2">
              <Label htmlFor="recipient">Select Recipient</Label>
              <Select
                value={selectedUserId}
                onValueChange={(value) => setSelectedUserId(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {recipientInfo?.length > 0 ? (
                    recipientInfo.map((u: any) => (
                      <SelectItem key={u._id} value={u._id}>
                        <span className="text-black text-sm "> {u.name}</span>
                        <span className="text-gray-500 text-xs">
                          {" "}
                          ({u.email})
                        </span>
                      </SelectItem>
                    ))
                  ) : (
                    <p className="p-2 text-sm text-gray-500">No users found</p>
                  )}
                </SelectContent>
              </Select>
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
              {isLoading ? "Processing..." : "Send Money"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
