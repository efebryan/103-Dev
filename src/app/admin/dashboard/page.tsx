"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [copiedReview, setCopiedReview] = useState<number | null>(null);

  const stats = [
    { name: "Total Revenue", value: "$124,582.45", label: "Lifetime", icon: "payments", color: "text-primary bg-primary/10 border-primary/20" },
    { name: "Monthly Revenue", value: "$18,231.89", label: "June 2026", icon: "calendar_month", color: "text-secondary bg-secondary/10 border-secondary/20" },
    { name: "Today's Sales", value: "$1,849.00", label: "Live Tracker", icon: "trending_up", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    { name: "Products", value: "84", label: "Active Marketplace", icon: "shopping_bag", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
    { name: "Customers", value: "3,104", label: "Developers", icon: "group", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
    { name: "Orders", value: "1,882", label: "Transactions", icon: "shopping_cart", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
    { name: "Downloads", value: "14,582", label: "Package pulls", icon: "download", color: "text-teal-400 bg-teal-400/10 border-teal-400/20" },
    { name: "Active Licenses", value: "2,492", label: "Live Domains", icon: "verified_user", color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" },
    { name: "Pending Tickets", value: "4", label: "Needs Reply", icon: "support_agent", color: "text-rose-400 bg-rose-400/10 border-rose-400/20" },
    { name: "Conversion Rate", value: "4.82%", label: "Visitor ratio", icon: "percent", color: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
  ];

  const topProducts = [
    { title: "Horizon AI SaaS Boilerplate", category: "Templates", sales: 412, revenue: "$81,988.00" },
    { title: "Nexus Admin Dashboard", category: "Components", sales: 882, revenue: "$43,218.00" },
    { title: "Rust High-Performance Web Server", category: "Backend", sales: 254, revenue: "$32,766.00" },
  ];

  const latestOrders = [
    { id: "ORD-7729", user: "Sarah Jenkins", product: "Horizon AI SaaS Boilerplate", amount: "$199.00", status: "Completed", time: "2 mins ago" },
    { id: "ORD-6510", user: "Michael Chen", product: "Cyberpunk Tailwind UI Kit", amount: "$49.00", status: "Completed", time: "10 mins ago" },
    { id: "ORD-4412", user: "Alex Rivera", product: "AI Chatbot API Gateway", amount: "$129.00", status: "Pending", time: "32 mins ago" },
  ];

  const recentCustomers = [
    { name: "Bryan", email: "bryan@103.dev", purchases: 12, joined: "June 26" },
    { name: "David Miller", email: "david@miller.co", purchases: 5, joined: "June 25" },
    { name: "Jessica Taylor", email: "jessica@taylor.design", purchases: 2, joined: "June 24" },
  ];

  const supportTickets = [
    { id: "TCK-881", subject: "Prisma schema migration build failure", user: "m.chen@tech.org", priority: "High", status: "Open" },
    { id: "TCK-880", subject: "Stripe billing webhook double-charge check", user: "david@miller.co", priority: "Medium", status: "Open" },
  ];

  const latestReviews = [
    { author: "Devon Webb", rating: 5, text: "The Horizon Boilerplate saved me at least 40 hours of setup. Super clean Next.js structure!", product: "Horizon AI SaaS" },
    { author: "Alice Chen", rating: 5, text: "Incredibly fluid animations and gorgeous design system. Clients loved the Nexus dashboard layout.", product: "Nexus Admin Dashboard" },
  ];

  const activities = [
    { text: "Sarah Jenkins purchased Horizon AI SaaS Boilerplate", time: "2 mins ago", color: "bg-primary" },
    { text: "License key generated for Cyberpunk UI Kit", time: "10 mins ago", color: "bg-teal-400" },
    { text: "Ticket TCK-881 created by Michael Chen", time: "15 mins ago", color: "bg-rose-400" },
    { text: "Stripe payout processed successfully ($4,520.10)", time: "1 hour ago", color: "bg-emerald-400" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Console Dashboard</h1>
        <p className="text-on-surface-variant text-sm mt-1">Real-time telemetry, transaction metrics, client logs, and support desks.</p>
      </div>

      {/* 10 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            className="glass-card rounded-2xl p-5 border border-white/5 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{stat.name}</span>
              <div className={`p-1.5 rounded-lg border ${stat.color} flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-base">{stat.icon}</span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-black text-on-surface tracking-tight">{stat.value}</h4>
              <span className="text-[9px] text-outline font-medium mt-0.5 block">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-on-surface">Revenue Progress</h3>
              <p className="text-[10px] text-on-surface-variant">Monthly revenue flow comparison (Jun 1 - Jun 28)</p>
            </div>
            <span className="text-xs font-mono font-bold text-primary">$18.2k this month</span>
          </div>
          {/* SVG Line Chart */}
          <div className="h-48 w-full bg-[#010f1f]/50 rounded-2xl border border-white/5 p-4 flex items-end relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 100 50" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#42e5b0" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#42e5b0" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,45 Q15,35 30,38 T60,20 T90,15 T100,10 L100,50 L0,50 Z" fill="url(#chartGradient)" />
              <path d="M0,45 Q15,35 30,38 T60,20 T90,15 T100,10" fill="none" stroke="#42e5b0" strokeWidth="2" />
            </svg>
            <div className="absolute bottom-2 left-4 text-[9px] text-outline font-mono">Jun 1</div>
            <div className="absolute bottom-2 right-4 text-[9px] text-outline font-mono">Jun 28</div>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-on-surface">Today's Transactions</h3>
              <p className="text-[10px] text-on-surface-variant">Live hour-by-hour sales frequency tracker</p>
            </div>
            <span className="text-xs font-mono font-bold text-secondary">38 orders today</span>
          </div>
          {/* SVG Bar Chart */}
          <div className="h-48 w-full bg-[#010f1f]/50 rounded-2xl border border-white/5 p-4 flex justify-between items-end gap-2 relative">
            {[40, 20, 60, 80, 50, 90, 70, 45, 95, 30, 85, 60].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end h-full">
                <div 
                  style={{ height: `${h}%` }}
                  className="w-full bg-gradient-to-t from-primary/40 to-primary rounded-t-sm"
                />
              </div>
            ))}
            <div className="absolute bottom-2 left-4 text-[9px] text-outline font-mono">00:00</div>
            <div className="absolute bottom-2 right-4 text-[9px] text-outline font-mono">24:00</div>
          </div>
        </div>
      </div>

      {/* Detailed Tables Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Top Selling Products */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Top Selling Products</h3>
            <div className="space-y-3">
              {topProducts.map((prod, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <p className="text-xs font-bold text-on-surface">{prod.title}</p>
                    <span className="text-[9px] text-outline font-medium">{prod.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-extrabold text-primary">{prod.revenue}</p>
                    <span className="text-[9px] text-on-surface-variant font-mono">{prod.sales} sales</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link href="/admin/dashboard/products" className="text-[10px] text-primary hover:underline font-bold text-center block mt-4 border-t border-white/5 pt-4">
            View products catalog
          </Link>
        </div>

        {/* Latest Orders */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Latest Orders</h3>
            <div className="space-y-3">
              {latestOrders.map((ord) => (
                <div key={ord.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <span className="text-[9px] font-mono text-primary font-bold">{ord.id}</span>
                    <p className="text-xs font-semibold text-on-surface mt-0.5">{ord.user}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-on-surface">{ord.amount}</p>
                    <span className="text-[9px] text-outline">{ord.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link href="/admin/dashboard/orders" className="text-[10px] text-primary hover:underline font-bold text-center block mt-4 border-t border-white/5 pt-4">
            View transactions portal
          </Link>
        </div>

        {/* Recent Customers */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Recent Customers</h3>
            <div className="space-y-3">
              {recentCustomers.map((cust, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <p className="text-xs font-bold text-on-surface">{cust.name}</p>
                    <span className="text-[9px] text-on-surface-variant font-mono">{cust.email}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-primary">{cust.purchases} buy</p>
                    <span className="text-[9px] text-outline font-medium">{cust.joined}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link href="/admin/dashboard/users" className="text-[10px] text-primary hover:underline font-bold text-center block mt-4 border-t border-white/5 pt-4">
            View user profiles
          </Link>
        </div>
      </div>

      {/* Support, Reviews, Quick Actions & Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Support Tickets & Reviews Box */}
        <div className="space-y-8">
          {/* Recent Support Tickets */}
          <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Recent Support Tickets</h3>
            <div className="space-y-3">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-rose-400 font-bold">{ticket.id}</span>
                      <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[8px] bg-rose-400/10 text-rose-400 font-bold border border-rose-400/20">{ticket.priority}</span>
                    </div>
                    <p className="text-xs font-bold text-on-surface leading-snug">{ticket.subject}</p>
                    <p className="text-[9px] text-outline">{ticket.user}</p>
                  </div>
                  <button 
                    onClick={() => alert(`Opening support portal reply desk for ${ticket.id}...`)}
                    className="text-primary hover:underline text-xs font-semibold cursor-pointer shrink-0"
                  >
                    Reply
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Reviews */}
          <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Latest Reviews</h3>
            <div className="space-y-3">
              {latestReviews.map((rev, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-on-surface">{rev.author}</span>
                      <span className="text-[9px] text-outline ml-2 font-medium">Product: {rev.product}</span>
                    </div>
                    <div className="flex text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, r) => (
                        <span key={r} className="material-symbols-outlined text-xs">star</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">"{rev.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Activity Feed */}
        <div className="space-y-8">
          
          {/* Quick Actions Panel */}
          <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <button 
                onClick={() => alert("Redirecting to refund wizard...")}
                className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-on-surface transition-colors cursor-pointer text-left"
              >
                <span className="material-symbols-outlined text-primary text-base">receipt_long</span>
                <div>
                  <p className="font-bold">Refund Order</p>
                  <p className="text-[9px] text-on-surface-variant mt-0.5">Revoke transactions</p>
                </div>
              </button>

              <Link 
                href="/admin/dashboard/products"
                className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-on-surface transition-colors cursor-pointer text-left"
              >
                <span className="material-symbols-outlined text-primary text-base">add_box</span>
                <div>
                  <p className="font-bold">Add Product</p>
                  <p className="text-[9px] text-on-surface-variant mt-0.5">Publish templates</p>
                </div>
              </Link>

              <Link 
                href="/admin/dashboard/licenses"
                className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-on-surface transition-colors cursor-pointer text-left"
              >
                <span className="material-symbols-outlined text-primary text-base">vpn_key</span>
                <div>
                  <p className="font-bold">New License</p>
                  <p className="text-[9px] text-on-surface-variant mt-0.5">Generate serial key</p>
                </div>
              </Link>

              <Link 
                href="/admin/dashboard/settings"
                className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-on-surface transition-colors cursor-pointer text-left"
              >
                <span className="material-symbols-outlined text-primary text-base">settings</span>
                <div>
                  <p className="font-bold">Settings Setup</p>
                  <p className="text-[9px] text-on-surface-variant mt-0.5">Platform switches</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-on-surface border-b border-white/5 pb-2">Recent Activity Feed</h3>
            <div className="space-y-4">
              {activities.map((act, index) => (
                <div key={index} className="flex gap-4 items-start text-xs">
                  <div className={`w-2 h-2 rounded-full ${act.color} mt-1.5 flex-shrink-0`}></div>
                  <div className="flex-1 flex justify-between items-start gap-4">
                    <p className="text-on-surface-variant leading-relaxed">{act.text}</p>
                    <span className="text-[10px] text-outline font-mono shrink-0">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
