import { Card, Metric, Text, Grid } from "@tremor/react";
import { useGetAllStatisticsQuery } from "@/Redux/Features/Transaction/transaction.api";
import { Repeat, UserCheck, Users, Wallet } from "lucide-react";

export default function Statistics() {
  const { data: allStatistics, isLoading } =
    useGetAllStatisticsQuery(undefined);

  if (isLoading) {
    return <div className="p-6">Loading statistics...</div>;
  }

  const stats = allStatistics?.data;

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg mt-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <Text className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Platform Statistics
        </Text>
        <Text className="text-gray-500 dark:text-gray-300 mt-2">
          Real-time overview of system activity
        </Text>
      </div>

      {/* Cards Grid */}
      <Grid numItemsSm={2} numItemsMd={4} numItemsLg={4} className="gap-4">
        {/* Users */}
        <Card className="relative overflow-hidden  rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="">
              <Text className="text-white/80">Total Users</Text>
              <Metric className="mt-2 text-3xl">{stats?.users}</Metric>
            </div>
            <div className="p-3 rounded-full bg-white/20 ">
              <Users className="h-7 w-7 text-white" />
            </div>
          </div>
        </Card>

        {/* Agents */}
        <Card className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-white/80">Total Agents</Text>
              <Metric className="mt-2 text-3xl">{stats?.agents}</Metric>
            </div>
            <div className="p-3 rounded-full bg-white/20">
              <UserCheck className="h-7 w-7 text-white" />
            </div>
          </div>
        </Card>

        {/* Wallets */}
        <Card className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-white/80">Total Wallets</Text>
              <Metric className="mt-2 text-3xl">{stats?.wallets}</Metric>
            </div>
            <div className="p-3 rounded-full bg-white/20">
              <Wallet className="h-7 w-7 text-white" />
            </div>
          </div>
        </Card>

        {/* Transactions */}
        <Card className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-white/80">Total Transactions</Text>
              <Metric className="mt-2 text-3xl">{stats?.transactions}</Metric>
            </div>
            <div className="p-3 rounded-full bg-white/20">
              <Repeat className="h-7 w-7 text-white" />
            </div>
          </div>
        </Card>
      </Grid>
    </div>
  );
}
