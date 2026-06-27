"use client";

import { motion } from "framer-motion";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Sales", value: "$45,231.89", change: "+20.1% from last month", icon: "payments" },
    { name: "Active Users", value: "12,482", change: "+12.2% from last month", icon: "group" },
    { name: "Active Sellers", value: "842", change: "+4.3% from last month", icon: "store" },
    { name: "Total Products", value: "3,104", change: "+15.6% from last month", icon: "shopping_bag" },
  ];

  const recentTransactions = [
    { id: "TX-9012", user: "Sarah Jenkins", product: "Horizon Next.js SaaS Template", amount: "$99.00", status: "Completed", date: "Just now" },
    { id: "TX-9011", user: "Michael Chen", product: "Cyberpunk Tailwind UI Kit", amount: "$49.00", status: "Completed", date: "10 mins ago" },
    { id: "TX-9010", user: "Alex Rivera", product: "AI Chatbot API Gateway", amount: "$129.00", status: "Pending", date: "32 mins ago" },
    { id: "TX-9009", user: "Emma Watson", product: "Rust High-Performance Web Server", amount: "$79.00", status: "Completed", date: "1 hour ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Console Dashboard</h1>
          <p className="text-on-surface-variant text-sm mt-1">Monitor the state of 103 Dev platform activities, sales, and users.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high border border-outline-variant px-4 py-2 rounded-xl text-xs font-semibold hover:bg-surface-bright transition-colors text-on-surface">
            Export Report
          </button>
          <button className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold hover:scale-95 transition-transform">
            Platform Settings
          </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-medium">{stat.name}</span>
              <span className="material-symbols-outlined text-primary text-[20px]">{stat.icon}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-on-surface">{stat.value}</h3>
              <p className="text-[10px] text-primary/80 mt-1 font-medium">{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table Section */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-base font-bold text-on-surface">Recent Platform Sales</h3>
          <span className="text-xs text-primary font-medium hover:underline cursor-pointer">View all sales</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-on-surface">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-container-high/20 transition-colors">
                  <td className="py-4 px-6 font-mono font-medium text-primary">{tx.id}</td>
                  <td className="py-4 px-6">{tx.user}</td>
                  <td className="py-4 px-6 text-on-surface-variant">{tx.product}</td>
                  <td className="py-4 px-6 text-right font-bold">{tx.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      tx.status === "Completed"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-tertiary/10 text-tertiary border-tertiary/20"
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right text-on-surface-variant text-xs">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
