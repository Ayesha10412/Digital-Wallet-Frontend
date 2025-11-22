/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllTransactionQuery } from "@/Redux/Features/Transaction/transaction.api";
import { useState } from "react";

export default function AllTransaction() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: allTransaction } = useGetAllTransactionQuery({
    search,
    type: type === "all" ? "" : type,
    startDate,
    endDate,
  });

  const transactions = allTransaction?.data || [];

  const total = (t: string) =>
    transactions
      .filter((item: any) => item.type === t)
      .reduce((sum: number, i: any) => sum + i.amount, 0);

  return (
    <div className="p-6 space-y-6">

      {/* FILTER BAR */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <Input
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select value={type} onValueChange={(v) => setType(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="cash-in">Cash In</SelectItem>
              <SelectItem value="cash-out">Cash Out</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="withdraw">Withdraw</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 shadow-md">
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{transactions.length}</p>
          </CardContent>
        </Card>

        <Card className="p-4 shadow-md">
          <CardHeader>
            <CardTitle className="text-green-600">Cash In</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{total("cash-in")}</p>
          </CardContent>
        </Card>

        <Card className="p-4 shadow-md">
          <CardHeader>
            <CardTitle className="text-blue-600">Cash Out</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{total("cash-out")}</p>
          </CardContent>
        </Card>

        <Card className="p-4 shadow-md">
          <CardHeader>
            <CardTitle className="text-yellow-600">Deposit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{total("deposit")}</p>
          </CardContent>
        </Card>

        <Card className="p-4 shadow-md">
          <CardHeader>
            <CardTitle className="text-red-600">Withdraw</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{total("withdraw")}</p>
          </CardContent>
        </Card>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx: any, i: number) => (
              <tr key={tx._id} className="hover:bg-gray-50">
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2">{tx.fromUser?.name || tx.toUser?.name}</td>
                <td className="border p-2">{tx.fromUser?.email || tx.toUser?.email}</td>
                <td className="border p-2">${tx.amount}</td>
                <td className="border p-2">{tx.type}</td>
                <td className="border p-2">{tx.status}</td>
                <td className="border p-2">
                  {new Date(tx.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
