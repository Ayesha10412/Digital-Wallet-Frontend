/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetOwnTransactionQuery } from "@/Redux/Features/Transaction/transaction.api";

export default function TransactionHistory() {
  const { data: OwnTransaction, isLoading } =
    useGetOwnTransactionQuery(undefined);

  const transactions = OwnTransaction?.data || [];

  if (isLoading) {
    return <p className="text-center mt-6">Loading transactions...</p>;
  }

  if (transactions.length === 0) {
    return <p className="text-center mt-6">No transactions found.</p>;
  }

  return (
    <div className="w-full mx-auto mt-8 ">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Transaction History
      </h2>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-6 py-3 text-center align-middle">Type</th>
                <th className="px-6 py-3 text-center align-middle">Amount</th>
                <th className="px-6 py-3 text-center align-middle">Status</th>
                <th className="px-6 py-3 text-center align-middle">From / To</th>
                <th className="px-6 py-3 text-center align-middle">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {transactions.map((tx: any) => (
                <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                  {/* Type */}
                  <td className="px-6 py-4 align-middle">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tx.type === "deposit"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-semibold text-right align-middle">
                    <span
                      className={
                        tx.type === "deposit"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {tx.type === "deposit" ? "+" : "-"} {tx.amount}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 align-middle">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      ● {tx.status}
                    </span>
                  </td>

                  {/* From / To */}
                  <td className="px-6 py-4 align-middle">
                    {tx.type === "deposit" && tx.toUser && (
                      <div>
                        <p className="font-medium text-gray-800">
                          To: {tx.toUser.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {tx.toUser.email}
                        </p>
                      </div>
                    )}

                    {tx.type === "withdraw" && tx.fromUser && (
                      <div>
                        <p className="font-medium text-gray-800">
                          From: {tx.fromUser.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {tx.fromUser.email}
                        </p>
                      </div>
                    )}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-500 text-xs text-right align-middle">
                    {new Date(tx.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
