import { Card } from "@/components/ui/card";
import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "John D., Small Business Owner",
      message:
        "Managing transactions has never been easier! I can track my wallet and agent activity in real-time. This platform saves me so much time.",
    },
    {
      name: "Sarah K., Freelance Agent",
      message:
        "I love how intuitive the system is. Everything from wallets to transactions is seamless and fast. Highly recommended!",
    },
    {
      name: "Michael R., Entrepreneur",
      message:
        "The statistics dashboard gives me instant insights into my business. The UI is clean, modern, and very professional.",
    },
    {
      name: "Emily S., Digital Wallet User",
      message:
        "I feel safe knowing my funds are tracked and secure. Plus, seeing real-time activity keeps me confident using this platform.",
    },
  ];

  return (
    <div className="mt-12 px-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <Card
            key={t.name}
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-blue-100"
          >
            <h3 className="font-semibold text-blue-900 dark:text-white">
              {t.name}
            </h3>
            <p className="text-gray-500 mt-2">"{t.message}"</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
