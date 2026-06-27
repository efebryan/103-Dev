"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function SupportPage() {
  const [tickets, setTickets] = useState([
    {
      id: "TKT-8802",
      title: "Prisma connection pool issue on serverless function",
      category: "Technical",
      status: "Answered",
      lastUpdate: "3 hours ago",
    },
    {
      id: "TKT-6501",
      title: "Upgrade billing from Personal to Commercial Pro",
      category: "Billing",
      status: "Closed",
      lastUpdate: "June 24, 2026",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Technical");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTitle,
      category: newCategory,
      status: "Open",
      lastUpdate: "Just now",
    };

    setTickets([newTicket, ...tickets]);
    setNewTitle("");
    alert("Support ticket created successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Developer Support Center</h1>
        <p className="text-on-surface-variant text-sm mt-1">Get priority technical help, resolve billing issues, or check active ticket statuses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Support Request Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/5">
            <h3 className="text-base font-bold text-on-surface mb-4">Open a Priority Ticket</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Subject / Issue Title</label>
                <input
                  type="text"
                  placeholder="e.g. Stripe webhook verification failing in local env"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface placeholder:text-on-surface-variant/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#010f1f] border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface"
                >
                  <option value="Technical">Technical / Bug Support</option>
                  <option value="Billing">Billing & Orders</option>
                  <option value="License">Licensing & Activations</option>
                  <option value="General">General Inquiry</option>
                </select>
              </div>

              <button type="submit" className="bg-primary text-on-primary w-full py-2.5 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                Submit Ticket
              </button>
            </form>
          </div>
        </div>

        {/* Right Side Ticket Activity Log */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-on-surface">Active Tickets</h3>
            <div className="space-y-4">
              {tickets.map((t) => (
                <div key={t.id} className="p-4 rounded-xl bg-surface-container-high/30 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-primary">{t.id}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold border ${
                      t.status === "Open" ? "bg-primary/10 text-primary border-primary/20" :
                      t.status === "Answered" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      "bg-white/5 text-outline border-white/10"
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-on-surface leading-normal line-clamp-1">{t.title}</h4>
                  <div className="flex items-center justify-between text-[10px] text-on-surface-variant pt-1">
                    <span>{t.category}</span>
                    <span>{t.lastUpdate}</span>
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
