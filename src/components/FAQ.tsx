"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "What license comes with my purchase?",
    answer: "Every purchase comes with a standard commercial license allowing use in one end product (personal or client). Extended licenses are available for unlimited projects.",
  },
  {
    question: "How do I access product updates?",
    answer: "All updates are free forever. You can download the latest version of any product you've purchased directly from your account dashboard.",
  },
  {
    question: "Can I request a refund?",
    answer: "Due to the digital nature of our products, we typically do not offer refunds once the files have been downloaded. However, we guarantee products will work as described.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 max-w-[800px] mx-auto px-8 w-full">
      <h2 className="text-3xl font-bold text-on-surface text-center mb-12">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="border-b border-white/5 pb-4">
              <button
                className="w-full flex justify-between items-center text-left py-4 group focus:outline-none"
                onClick={() => toggle(idx)}
              >
                <span className="text-base md:text-lg font-semibold text-on-surface group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <span
                  className="material-symbols-outlined text-primary transition-transform duration-300 font-bold"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  add
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="text-on-surface-variant text-sm md:text-base pb-4 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
