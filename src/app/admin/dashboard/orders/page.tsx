"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const orders = [
    { id: "ORD-7729", customer: "Bryan", email: "bryan@103.dev", date: "June 25, 2026", product: "Horizon AI SaaS Boilerplate", total: "$199.00", status: "Completed", method: "Stripe" },
    { id: "ORD-6510", customer: "Sarah Jenkins", email: "sarah@jenkins.co", date: "June 12, 2026", product: "Cyberpunk Tailwind UI Kit", total: "$49.00", status: "Completed", method: "PayPal" },
    { id: "ORD-4412", customer: "Michael Chen", email: "m.chen@tech.org", date: "May 30, 2026", product: "Rust High-Performance Web Server", total: "$129.00", status: "Refunded", method: "Stripe" },
    { id: "ORD-3321", customer: "Emma Watson", email: "emma@watson.dev", date: "May 15, 2026", product: "Horizon AI SaaS Boilerplate", total: "$199.00", status: "Completed", method: "Stripe" },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === "all" || order.status.toLowerCase() === filter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Manage Orders</h1>
          <p className="text-on-surface-variant text-sm mt-1">Review purchase records, stripe transactions, and process refunds.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full md:w-auto">
          {["all", "completed", "refunded"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize border cursor-pointer transition-colors ${
                filter === status
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container-high border-outline-variant text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 w-full md:w-80 focus-within:ring-1 focus-within:ring-primary transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">search</span>
          <input
            type="text"
            placeholder="Search order ID, customer, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-on-surface placeholder:text-on-surface-variant/40"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-on-surface">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-high/20 transition-colors">
                  <td className="py-4 px-6 font-mono font-medium text-primary">{order.id}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold">{order.customer}</p>
                      <p className="text-[10px] text-outline">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">{order.product}</td>
                  <td className="py-4 px-6 text-on-surface-variant">{order.date}</td>
                  <td className="py-4 px-6 text-right font-bold">{order.total}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      order.status === "Completed"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-error/10 text-error border-error/20"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    {order.status === "Completed" && (
                      <button
                        onClick={() => alert(`Processing refund for ${order.id}...`)}
                        className="text-error hover:underline font-semibold cursor-pointer text-xs"
                      >
                        Refund
                      </button>
                    )}
                    <button
                      onClick={() => alert(`Resending invoice for ${order.id} to ${order.email}...`)}
                      className="text-primary hover:underline font-semibold cursor-pointer text-xs"
                    >
                      Resend Invoice
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-on-surface-variant font-medium">
                    No orders found matching search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
