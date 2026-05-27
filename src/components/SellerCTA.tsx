"use client";

import { motion } from "framer-motion";

export default function SellerCTA() {
  return (
    <section className="py-20 max-w-[1280px] mx-auto px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-card rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden"
      >
        {/* Decorative Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-tertiary/5 pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-tertiary/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface leading-tight">
            Start Selling Your Digital Products
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
            Join the most elite marketplace for developers. Reach thousands of customers and scale your business with our specialized platform.
          </p>
          <button className="bg-primary text-on-primary px-10 py-4.5 rounded-2xl text-base font-semibold hover:shadow-[0_0_35px_rgba(0,200,150,0.35)] transition-all active:scale-95 duration-200">
            Apply to be a Seller
          </button>
        </div>
      </motion.div>
    </section>
  );
}
