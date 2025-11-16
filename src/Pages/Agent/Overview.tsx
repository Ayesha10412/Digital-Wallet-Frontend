/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useUserInfoQuery } from "@/Redux/Features/User/user.api";
import {
  useGetWalletBalanceQuery,
  useGetWalletHistoryQuery,
} from "@/Redux/Features/Wallet/wallet.api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";

export default function Overview() {
  const { data: userData } = useUserInfoQuery(undefined);
  const user = userData?.data;
  const userId = user?._id;

  const isAgent = user?.role === "AGENT";

  const { data: walletData } = useGetWalletBalanceQuery(userId, {
    skip: !userId,
  });

  const { data: walletHistory } = useGetWalletHistoryQuery(userId, {
    skip: !userId,
  });

  const wallet = walletData?.data;
  const transactions = walletHistory?.data || [];

  const chartData = transactions.map((tx: any, index: number) => ({
    name: `#${index + 1}`,
    amount: tx.amount,
  }));

  return (
    <div className="p-6 md:p-10 space-y-8 bg-gray-50 min-h-screen">
      {/* Wallet Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-3xl shadow-xl">
          <CardContent className="p-8">
            <p className="text-lg font-medium">
              {isAgent ? "Agent Wallet Balance" : "Wallet Balance"}
            </p>
            <h2 className="text-5xl font-bold mt-2">
              {wallet ? `${wallet.balance} ${wallet.currency}` : "Loading..."}
            </h2>
            <p className="mt-3 opacity-90">Status: {wallet?.status}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {/* AGENT ACTIONS */}
        {isAgent && (
          <>
            <Link
              to="/agent/cash-in"
              className="bg-green-600 hover:bg-green-700 text-white py-2 text-sm font-bold rounded-xl shadow-md transition transform hover:scale-105"
            >
              Cash In for User
            </Link>

            <Link
              to="/agent/cash-out"
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 text-sm font-bold rounded-xl shadow-md transition transform hover:scale-105"
            >
              Cash Out for User
            </Link>

            <Link
              to="/agent/transactions"
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 text-sm font-bold rounded-xl shadow-md transition transform hover:scale-105"
            >
              All Transactions
            </Link>
          </>
        )}

        {/* USER ACTIONS */}
        {!isAgent && (
          <>
            <Link
              to="/user/sendMoney"
              className="bg-green-500 hover:bg-green-600 text-white py-2 font-bold text-sm rounded-xl shadow-md transition transform hover:scale-105"
            >
              Send Money
            </Link>

            <Link
              to="/user/withdrawMoney"
              className="bg-red-500 hover:bg-red-600 text-white py-2 font-bold text-sm rounded-xl shadow-md transition transform hover:scale-105"
            >
              Withdraw
            </Link>

            <Link
              to="/user/cash-in"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 font-bold text-sm rounded-xl shadow-md transition transform hover:scale-105"
            >
              Cash In
            </Link>

            <Link
              to="/user/cash-out"
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 font-bold text-sm rounded-xl shadow-md transition transform hover:scale-105"
            >
              Cash Out
            </Link>
          </>
        )}
      </motion.div>

      {/* Transaction Chart */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="rounded-3xl shadow-lg p-6 bg-white">
          <h3 className="text-lg font-semibold mb-4">
            Recent Transactions ({isAgent ? "Agent" : "User"})
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2563EB"
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Transaction Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {transactions.slice(0, 6).map((tx: any) => (
          <Card
            key={tx._id}
            className="rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-105 p-5 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold capitalize text-gray-700">
                {tx.type}
              </p>
              <p
                className={`font-bold ${
                  tx.type === "withdraw" || tx.type === "send"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {tx.type === "withdraw" || tx.type === "send" ? "-" : "+"}{" "}
                {tx.amount} {wallet?.currency}
              </p>
            </div>

            <p className="text-sm text-gray-400">Status: {tx.status}</p>
            <p className="text-sm text-gray-400 mt-1">
              Transaction ID: {tx._id}
            </p>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
