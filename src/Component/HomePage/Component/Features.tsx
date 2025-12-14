import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Send,
  BarChart3,
  FileText,
  Globe,
  Bell,
} from "lucide-react";
import { Link } from "react-router";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Wallet Protection",
    description:
      "Your funds and data are protected using industry-grade encryption and secure authentication methods.",
  },
  {
    icon: Send,
    title: "Instant Money Transfers",
    description:
      "Send and receive money instantly with real-time confirmation and transaction updates.",
  },
  {
    icon: BarChart3,
    title: "Smart Expense Tracking",
    description:
      "Visualize and analyze your spending patterns through interactive charts and summaries.",
  },
  {
    icon: FileText,
    title: "Detailed Transaction History",
    description:
      "Access complete transaction records with filters for date, type, and amount.",
  },
  {
    icon: Globe,
    title: "Multi-Device Access",
    description:
      "Use your digital wallet securely across mobile, tablet, and desktop devices.",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    description:
      "Stay informed with instant alerts for transactions, balance changes, and security updates.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Digital Wallet
            </span>{" "}
            Features
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage, move, and monitor your money —
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {" "}
              securely and effortlessly
            </span>
            .
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-card border rounded-2xl p-6 shadow-sm  hover:shadow-md transition"
              >
                {/* Icon */}
                <div className="flex   items-center  justify-center w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 mb-5">
                  <Icon size={26} />
                </div>

                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg mb-8">
            Ready to experience{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              smarter digital payments
            </span>
            ?
          </p>

          <Link to="/login" className="px-6 py-4  rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Create Your Free Wallet
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
