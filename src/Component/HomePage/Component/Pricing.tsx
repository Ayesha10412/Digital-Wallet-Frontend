import { Button } from "@/components/ui/button";
import React from "react";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Basic Wallet Access",
      "Send & Receive Money",
      "Transaction History",
      "Limited Support",
    ],
  },
  {
    name: "Standard",
    price: "$9.99 / mo",
    features: [
      "All Free Features",
      "Priority Support",
      "Multi-Currency Support",
      "Advanced Analytics",
    ],
  },
  {
    name: "Premium",
    price: "$19.99 / mo",
    features: [
      "All Standard Features",
      "Instant Transfers",
      "Higher Transaction Limits",
      "Exclusive Offers",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="bg-background text-white py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-blue-600">Pricing Plans</h1>
          <p className="text-gray-400 text-lg">
            Choose the plan that fits your needs. Start with free or unlock
            advanced features with premium tiers.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-card border border-gray-100 rounded-2xl p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl transition"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-blue-600">
                  {plan.name}
                </h2>
                <p className="text-3xl font-extrabold">{plan.price}</p>

                <ul className="space-y-2 mt-4 text-gray-400">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2 text-blue-600 font-bold">✔</span>{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="mt-6 bg-blue-600 hover:bg-blue-700 w-full">
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
