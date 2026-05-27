"use client";

import { motion } from "framer-motion";

const CATEGORIES = [
  { name: "React Templates", icon: "data_object" },
  { name: "Next.js Apps", icon: "bolt" },
  { name: "Laravel Scripts", icon: "terminal" },
  { name: "Admin Dashboards", icon: "dashboard" },
  { name: "Mobile Apps", icon: "smartphone" },
  { name: "AI Tools", icon: "psychology" },
  { name: "APIs", icon: "api" },
  { name: "UI Kits", icon: "design_services" },
];

export default function Categories() {
  return (
    <section className="py-20 bg-surface-container-lowest">
      <div className="max-w-[1280px] mx-auto px-8">
        <h2 className="text-3xl font-bold text-on-surface mb-12 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.a
              key={cat.name}
              href="#"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card p-8 rounded-2xl flex flex-col items-center gap-4 text-center group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                <span className="material-symbols-outlined text-[32px]">{cat.icon}</span>
              </div>
              <span className="font-semibold text-on-surface text-base group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
