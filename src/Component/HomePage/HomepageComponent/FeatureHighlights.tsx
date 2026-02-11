import { Card } from "@/components/ui/card";

export default function FeatureHighlights() {
  const features = [
    {
      title: "Fast Transactions",
      description: "Send and receive funds instantly with a reliable system.",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Secure Wallets",
      description: "Your funds are safe with our encrypted wallets.",
      color: "from-green-400 to-green-600",
    },
    {
      title: "Agent Network",
      description: "Grow your network with trusted agents worldwide.",
      color: "from-purple-400 to-purple-600",
    },
    {
      title: "Real-Time Analytics",
      description: "Track transactions and activity in real time.",
      color: "from-orange-400 to-red-500",
    },
  ];

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
        Why Choose Our Platform
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <Card
            key={f.title}
            className={`p-6 rounded-2xl bg-gradient-to-br ${f.color} text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl`}
          >
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-white/80">{f.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
