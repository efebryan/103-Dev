"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { name: "Purchased Assets", value: "12", label: "Lifetime", icon: "shopping_cart", color: "primary" },
    { name: "Total Downloads", value: "84", label: "Storage", icon: "download", color: "secondary" },
    { name: "Updates Available", value: "3", label: "Action Required", icon: "update", color: "error" },
    { name: "Wishlist Items", value: "15", label: "Saved", icon: "favorite", color: "tertiary" },
  ];

  const continueWorking = [
    {
      name: "Horizon AI SaaS Boilerplate",
      description: "Next.js 14, Tailwind, Prisma, Stripe",
      installed: "v2.1.0",
      latest: "v2.2.4",
      tag: "NEW VERSION",
      hasUpdate: true,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB86kGpSg0O7911-LjUVmB9kUiTlhH4uUsTS5aK_YPvyP-SVT7Kyo1HaBF_QOYoqKI9voUE4hTiszqEqhVJ8T80avH9uXmru0vLRNR6BTyfXb42FKZ9tZwG8V3PP1EuBTxwsPE_BXmaFekcqFlyJy7koB7ULP-CRIYLBVIjY7lIlhyEuAmr1ZzazpUKx6gWxHZ0QweIedovksOGGWpkqFSZpVkGZGf5Iz_ARGVFtMHVcuc2i4hMLVeGbGkSOuR3ykq0DRB8b7VQvxgG",
    },
    {
      name: "Nexus Admin Dashboard",
      description: "React, TypeScript, Framer Motion",
      installed: "v4.0.0",
      latest: "v4.0.0",
      tag: null,
      hasUpdate: false,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQRD3LP1pVDCvd1WIybIMiKO-O-imHFxr6Fy_KMTuk8seis64MYf8s129rtIPelzmgBQHl5QCdstonMhZu_4_fxYo4KqoNG_YHPUudvnrl1H80axYmpvo15gpGaq85xrHhY7-LlwFzduRNb8cFR5nyjTxTL9nF9GvKfyHeDpVR4mzISe1LcYzFlorpaMNuszJJmU-W2DW_MZe5OiCWbjV5g74OQfC-C37WbBTlO8vxe_qzK8rSyfQ5rgB-5L2QMkawchgBzeCqyc8W",
    },
  ];

  const resources = [
    { title: "API Documentation", desc: "Full integration guides for all 103 Dev kits.", icon: "library_books", bgClass: "bg-primary/10", text: "text-primary", href: "/dashboard/docs" },
    { title: "Community Discord", desc: "Connect with 5k+ developers on our server.", icon: "forum", bgClass: "bg-secondary/10", text: "text-secondary", href: "/dashboard/docs" },
    { title: "CLI Toolbelt", desc: "Automate your workflow with our custom CLI.", icon: "terminal", bgClass: "bg-tertiary/10", text: "text-tertiary", href: "/dashboard/docs" },
    { title: "Priority Support", desc: "Tickets respond in < 2 hours for Pro users.", icon: "live_help", bgClass: "bg-surface-container-highest", text: "text-on-surface", href: "/dashboard/support" },
  ];

  const activities = [
    { text: "Downloaded Horizon AI v2.1.0 source files.", time: "2 hours ago", color: "bg-primary" },
    { text: "License verified for Nexus Dashboard.", time: "5 hours ago", color: "bg-emerald-400" },
    { text: "Added Quantum UI Kit to wishlist.", time: "Yesterday", color: "bg-tertiary" },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-2">Welcome back, Bryan 👋</h1>
          <p className="text-on-surface-variant max-w-xl text-sm">Manage your purchases, downloads, licenses, and developer resources from your centralized engineering command center.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono flex items-center gap-2 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            System Online
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant text-xs font-mono border border-white/5">
            v2.4.0-stable
          </span>
        </div>
      </section>

      {/* Stat Cards Bento */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between group hover:border-primary/30 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${
                stat.color === "primary" ? "bg-primary/10 text-primary" :
                stat.color === "secondary" ? "bg-secondary/10 text-secondary" :
                stat.color === "error" ? "bg-error/10 text-error" : "bg-tertiary/10 text-tertiary"
              }`}>
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${stat.color === "error" ? "text-error" : "text-outline"}`}>{stat.label}</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-on-surface">{stat.value}</p>
              <p className="text-on-surface-variant text-xs mt-1">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Continue Working */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-on-surface">Continue Working</h2>
          <button className="text-primary text-sm font-semibold hover:underline cursor-pointer">View All Library</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {continueWorking.map((product) => (
            <div key={product.name} className="glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row group border border-white/5 hover:border-primary/30 transition-all duration-300">
              <div className="md:w-48 h-48 md:h-auto relative overflow-hidden shrink-0">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={product.name} src={product.image} />
                {product.tag && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-on-primary text-[9px] rounded uppercase font-bold tracking-widest shadow-lg">
                    {product.tag}
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <div className="mb-2">
                  <h3 className="text-base font-bold text-on-surface">{product.name}</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">{product.description}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-outline font-bold">Installed</span>
                    <span className="text-xs font-mono text-on-surface mt-0.5">{product.installed}</span>
                  </div>
                  <div className="w-px h-6 bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-outline font-bold">Latest</span>
                    <span className={`text-xs font-mono mt-0.5 ${product.hasUpdate ? "text-primary font-bold" : "text-on-surface"}`}>{product.latest}</span>
                  </div>
                </div>
                <div className="mt-auto flex items-center gap-3">
                  <button className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    product.hasUpdate ? "bg-primary text-on-primary hover:brightness-110" : "bg-white/5 text-on-surface hover:bg-white/10 border border-white/10"
                  }`}>
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    {product.hasUpdate ? "Update Now" : "Download"}
                  </button>
                  <button className="py-2 px-4 bg-surface-container-high text-on-surface rounded-lg border border-white/10 font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-[16px]">description</span>
                    Docs
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Section: Resources & Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-on-surface">Engineering Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.map((res) => (
              <Link href={res.href} key={res.title} className="glass-card p-5 rounded-xl border border-white/5 flex items-start gap-4 hover:bg-primary/5 transition-colors cursor-pointer block">
                <div className={`p-2.5 rounded-lg ${res.bgClass} ${res.text}`}>
                  <span className="material-symbols-outlined text-[20px]">{res.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">{res.title}</h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{res.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-on-surface">Recent Activity</h2>
          <div className="glass-card rounded-2xl p-6 space-y-6 border border-white/5">
            {activities.map((act, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className={`w-2 h-2 rounded-full ${act.color} mt-1.5 flex-shrink-0`}></div>
                <div>
                  <p className="text-xs text-on-surface leading-relaxed">{act.text}</p>
                  <span className="text-[10px] text-outline mt-1 block font-mono">{act.time}</span>
                </div>
              </div>
            ))}
            <button className="w-full py-2.5 text-primary font-bold text-xs border-t border-white/5 pt-4 hover:brightness-125 transition-all cursor-pointer">
              View Full Log
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
