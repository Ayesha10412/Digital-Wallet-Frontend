/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I create a digital wallet?",
    answer:
      "You can create a digital wallet by signing up with your email and setting a secure password. Once registered, you can start managing your funds immediately.",
  },
  {
    question: "Is my money safe in the wallet?",
    answer:
      "Yes! We use bank-level encryption and secure authentication to protect your funds and personal data.",
  },
  {
    question: "Can I send money to anyone?",
    answer:
      "You can send money to anyone who has an account on our platform or using supported payment methods.",
  },
  {
    question: "Are there any transaction fees?",
    answer:
      "We offer a free tier with standard transactions. Premium services or instant transfers may have small fees, which are transparently displayed before confirmation.",
  },
  {
    question: "What if I forget my password?",
    answer:
      "You can reset your password by clicking the 'Forgot Password' link on the login page. A secure reset link will be sent to your email.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-background text-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600">Frequently Asked Questions</h1>
          <p className="text-gray-400 mt-2">
            Answers to the most common questions about using our digital wallet.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-gray-300 text-left hover:bg-gray-800 transition"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-900 text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
