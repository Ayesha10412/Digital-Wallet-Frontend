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
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";

export default function Analytics() {
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
  console.log(transactions);
  const total = (t: string) =>
    transactions
      .filter((item: any) => item.type === t)
      .reduce((sum: number, i: any) => sum + i.amount, 0);

  return (
    <div className="p-6 space-y-6 ">
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

      {/* TABLE */}
      <div className="overflow-x-auto mt-2">
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
                <td className="border p-2">
                  {tx.fromUser?.name || tx.toUser?.name}
                </td>
                <td className="border p-2">
                  {tx.fromUser?.email || tx.toUser?.email}
                </td>
                <td className="border p-2">${tx.amount}</td>
                <td className="border p-2">{tx.type}</td>
                <td className="border p-2 text-green-600">{tx.status}</td>
                <td className="border p-2">
                  {new Date(tx.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* CHART SECTION (Animated) */}
        <Card className="p-4 shadow-md mt-2">
          <CardHeader>
            <CardTitle>Transaction Overview</CardTitle>
          </CardHeader>

          <CardContent style={{ width: "100%", height: 350 }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full h-full"
            >
              <ResponsiveContainer>
                <BarChart
                  data={[
                    { type: "Cash In", amount: total("cash-in") },
                    { type: "Cash Out", amount: total("cash-out") },
                    { type: "Deposit", amount: total("deposit") },
                    { type: "Withdraw", amount: total("withdraw") },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />

                  <Bar
                    dataKey="amount"
                    fill="#6366F1"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1200}
                    animationBegin={200}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </CardContent>
        </Card>

        {/* SUMMARY CARDS (Unique Blur + Float Animation) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
          {[
            {
              title: "Total Transactions",
              value: transactions.length,
              color: "",
            },
            {
              title: "Cash In",
              value: total("cash-in"),
              color: "text-green-600",
            },
            {
              title: "Cash Out",
              value: total("cash-out"),
              color: "text-blue-600",
            },
            {
              title: "Deposit",
              value: total("deposit"),
              color: "text-yellow-600",
            },
            {
              title: "Withdraw",
              value: total("withdraw"),
              color: "text-red-600",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: i * 0.12,
              }}
            >
              <Card className="p-4 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl">
                <CardHeader>
                  <CardTitle className={item.color}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{item.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
