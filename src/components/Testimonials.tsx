"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "CEO @ TechFlow",
    text: '"The quality of the Horizon AI boilerplate saved us at least 3 months of development time. The code is exceptionally clean and the architecture is enterprise-grade."',
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj2Uoe7gkmqJFUvrmaHS1Ho2e9JafJGMzZxEGCpOHT6gIasI14WB0PCpYqmH4bH_z3l3edhOMKstTifi3FpTi4n2_mkT9_JmfLPscv0hTbxkq1Dy87mkdVGwdjzctI9d5kCirEwnN8C5x72N2NrEZW2zMXHE8HHf6kHBsfFoo8h5uy0zxfIiimg3C8qx2i5CYUM6KPkJJS6Lmc9CZrrTEwRwmeTWGP7LBnDDlgFFUBA68bf9VsCZB3df9vcN36FjEmT-LDm788bf0N",
    borderColorClass: "border-l-primary",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Founder @ DataNexus",
    text: '"I\'ve bought several dashboards from 103 Dev and every single one has exceeded my expectations. The support is responsive and the updates are consistent."',
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrKiNpXlhMUKkrEfXRaBvx0bsWuTkiEjQk22ZdqqF_kL8dexAENar1hS7LRWXywGYDJIiAPZBW5E2MnKYrEmQ8fRjjfGTkl2HGJCo2f4wGdnqtAGCasY9etxmfxoZA5LzEWTRmhleCLLJWo1Mnc9rteKj9bxOUEoHrsJ-ugUthYBGi3Ps5CbsQygiv7uDQQotY9hiIZWfUvIjs4tyR6ZhG7IHzIed9yOlEzxqcadDq6HyJnItxLxiOmfhYBxtOJJOW-xZmX_wFiJ5I",
    borderColorClass: "border-l-tertiary",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 max-w-[1280px] mx-auto px-8">
      <h2 className="text-3xl font-bold text-on-surface text-center mb-16">Loved by Founders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TESTIMONIALS.map((test, idx) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`glass-card p-8 rounded-3xl border-l-4 ${test.borderColorClass} flex flex-col justify-between`}
          >
            <div className="flex gap-4 items-center mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0 bg-surface-container-high">
                <img
                  className="w-full h-full object-cover"
                  src={test.avatar}
                  alt={test.name}
                />
              </div>
              <div>
                <p className="text-on-surface font-bold text-sm">{test.name}</p>
                <p className="text-on-surface-variant text-[11px] font-medium">{test.role}</p>
              </div>
            </div>
            <p className="italic text-on-surface-variant text-sm md:text-base leading-relaxed">{test.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
