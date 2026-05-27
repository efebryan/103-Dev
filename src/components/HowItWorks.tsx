"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    step: 1,
    title: "Browse Products",
    description: "Filter through thousands of high-quality developer assets.",
  },
  {
    step: 2,
    title: "Purchase Securely",
    description: "Add to cart and pay with your preferred secure method.",
  },
  {
    step: 3,
    title: "Download Instantly",
    description: "Get immediate access to files and documentation.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-[1280px] mx-auto px-8 text-center">
        <h2 className="text-3xl font-bold text-on-surface mb-16">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-outline-variant/30 z-0"></div>
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex-1 relative z-10 flex flex-col items-center group"
            >
              <div className="w-24 h-24 rounded-full bg-surface-container-high border-4 border-background flex items-center justify-center text-3xl font-bold text-primary mb-6 shadow-md group-hover:scale-105 transition-transform duration-300">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold text-on-surface mb-2">{step.title}</h3>
              <p className="text-on-surface-variant text-sm max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
