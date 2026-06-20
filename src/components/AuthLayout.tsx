"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center py-16 px-4 bg-background overflow-hidden selection:bg-primary/30 selection:text-primary">
      {/* Decorative cybernetic background elements */}
      <div className="absolute inset-0 z-0">
        {/* Glow Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-tertiary/10 blur-[120px] pointer-events-none" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[460px] flex flex-col items-center">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Back to Home
          </Link>
        </motion.div>

        {/* Branding & Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-block text-3xl font-extrabold text-on-surface tracking-tight hover:text-primary transition-colors mb-3">
            103<span className="text-primary">.Dev</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">{title}</h1>
          <p className="text-sm text-on-surface-variant/80 mt-2">{subtitle}</p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full bg-surface-container/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle top edge glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          {children}
        </motion.div>
      </div>
    </div>
  );
}
