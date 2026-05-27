"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Secure Payments",
    description: "All transactions are encrypted and processed through industry-leading payment gateways.",
    icon: "lock",
  },
  {
    title: "Instant Delivery",
    description: "Access your purchased assets immediately after checkout from your personal dashboard.",
    icon: "bolt",
  },
  {
    title: "Commercial Licensing",
    description: "Clean, straightforward licensing that allows you to use assets in commercial projects.",
    icon: "assignment",
  },
  {
    title: "Verified Developers",
    description: "Every seller and product is manually reviewed by our engineering team for code quality.",
    icon: "verified_user",
  },
  {
    title: "Regular Updates",
    description: "Get lifetime access to all future updates for the products you purchase.",
    icon: "update",
  },
  {
    title: "Premium Support",
    description: "Direct communication channel with the authors for any technical issues or queries.",
    icon: "support_agent",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 max-w-[1280px] mx-auto px-8">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl font-bold text-on-surface">Why Developers Choose 103 Dev</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base">
          We prioritize quality, security, and developer experience above everything else.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feat, idx) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="glass-card p-8 rounded-3xl flex flex-col items-start"
          >
            <span className="material-symbols-outlined text-primary text-[40px] mb-6">{feat.icon}</span>
            <h3 className="text-lg font-semibold text-on-surface mb-3">{feat.title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{feat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
