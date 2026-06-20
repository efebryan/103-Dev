"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 min-h-[calc(100vh-72px)] flex items-center">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-tertiary/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Left Side Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Trusted by 10,000+ developers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">
            Premium Website Scripts & <span className="text-primary">SaaS Templates</span> Built for Developers
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Discover production-ready scripts, scalable SaaS boilerplates, admin dashboards, APIs, AI tools, and developer assets ready for deployment.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/signup" className="bg-primary text-on-primary px-8 py-4 rounded-xl text-base font-semibold hover:shadow-[0_0_30px_rgba(0,200,150,0.4)] transition-all active:scale-95 duration-200 inline-block text-center">
              Explore Marketplace
            </Link>
            <Link href="/signup" className="bg-surface-container-high text-on-surface px-8 py-4 rounded-xl text-base font-semibold border border-outline-variant hover:bg-surface-bright transition-all active:scale-95 duration-200 inline-block text-center">
              Become a Seller
            </Link>
          </div>
          {/* Trust Badges */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">download</span>
              Instant Downloads
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
              Secure Payments
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
              Verified Products
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">all_inclusive</span>
              Lifetime Access
            </div>
          </div>
        </motion.div>

        {/* Right Side Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mt-12 lg:mt-0 justify-self-center lg:justify-self-end w-full max-w-[560px]"
        >
          <div className="relative z-20 glass-card rounded-2xl p-4 overflow-hidden shadow-2xl">
            {/* Using standard img for external optimized URL */}
            <img
              className="rounded-xl w-full object-cover aspect-[16/10]"
              alt="103 Dev Premium Marketplace Dashboard Preview"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb8751M7Je9GuK00dv3abmE33PICtxzphg15jR2qJqdFrp0osb6_V9qVuOd_j59NtiD0wNTApv2OXhPfjG_xnz7fTAEUeVTpaJe_pOXXvFSsOluMJ1JotRgzajiud4wrm9idXGaw8hBxgUAKLTP_H88WpNljKccUgy-shcdNvaJlRLmeHA06PXOp4pr5H55meYXYdiZibSnXUnumMS3mvZrHuOFYsiTz09VZ5PicNiCxH9dbvdN7xEUs5fgGWjevTPljaBqaJW44tG"
            />
          </div>

          {/* Floating Code Snippet */}
          <div className="absolute -top-6 -right-6 glass-card p-4 rounded-xl code-float z-30 hidden md:block border-primary/20 shadow-lg">
            <pre className="text-primary font-mono text-[11px] leading-relaxed">
              <code>{`const api = new AI_Engine({
  model: "horizon-ultra",
  stream: true
});`}</code>
            </pre>
          </div>

          {/* Floating Analytics Card */}
          <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl shadow-xl z-30 hidden md:block border-tertiary/20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-tertiary text-xl">query_stats</span>
              </div>
              <div>
                <p className="text-on-surface font-bold text-sm">Real-time Analytics</p>
                <p className="text-on-surface-variant text-[11px]">Processing 1.2M requests/s</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
