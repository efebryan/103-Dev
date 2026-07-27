"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function OrdersPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return setLoading(false);
      supabase
        .from("orders")
        .select(`*, templates(id, title, thumbnail_url)`)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          setOrders(data ?? []);
          setLoading(false);
        });
    });
  }, []);

  const filtered = filterStatus === "all"
    ? orders
    : orders.filter(o => o.order_status === filterStatus);

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const fmtAmount = (n: number) => `$${Number(n).toFixed(2)}`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Order History</h1>
        <p className="text-on-surface-variant text-sm mt-1">Access past invoices, purchase records, and transaction receipts.</p>
      </div>

      {loading ? (
        <div className="glass-card rounded-2xl border border-white/5 p-16 text-center text-on-surface-variant text-xs">Loading orders…</div>
      ) : (
        <div className="space-y-6">
          {/* Desktop Table */}
          <div className="hidden md:block glass-card rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-base font-bold text-on-surface">All Orders</h3>
              <div className="flex gap-2">
                {["all", "completed", "pending", "refunded", "cancelled"].map(s => (
                  <button key={s} onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border cursor-pointer transition-colors ${filterStatus === s ? "bg-primary text-on-primary border-primary" : "bg-surface-container-high border-outline-variant text-on-surface-variant hover:text-on-surface"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                    <th className="py-4 px-6">Order ID</th>
                    <th className="py-4 px-6">Purchase Date</th>
                    <th className="py-4 px-6">Asset</th>
                    <th className="py-4 px-6 text-right">Total Paid</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-on-surface">
                  {filtered.map((order) => (
                    <tr key={order.id} className="hover:bg-surface-container-high/20 transition-colors">
                      <td className="py-4 px-6 font-mono font-medium text-primary text-xs">{order.id.slice(0, 8).toUpperCase()}</td>
                      <td className="py-4 px-6 text-on-surface-variant">{fmt(order.created_at)}</td>
                      <td className="py-4 px-6 font-semibold">{order.templates?.title ?? "—"}</td>
                      <td className="py-4 px-6 text-right font-bold">{fmtAmount(order.amount)}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          order.order_status === "completed" ? "bg-primary/10 text-primary border-primary/20" :
                          order.order_status === "pending" ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                          order.order_status === "refunded" ? "bg-purple-400/10 text-purple-400 border-purple-400/20" :
                          "bg-rose-400/10 text-rose-400 border-rose-400/20"}`}>
                          {order.order_status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button onClick={() => setSelectedInvoice(order)} className="text-primary hover:underline text-xs font-semibold cursor-pointer">View Invoice</button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} className="py-8 text-center text-on-surface-variant text-xs">No orders found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">
            {filtered.map(order => (
              <div key={order.id} className="glass-card rounded-2xl p-5 border border-white/5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-primary font-bold">{order.id.slice(0,8).toUpperCase()}</span>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{fmt(order.created_at)}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                    order.order_status === "completed" ? "bg-primary/10 text-primary border-primary/20" : "bg-rose-400/10 text-rose-400 border-rose-400/20"}`}>
                    {order.order_status}
                  </span>
                </div>
                <p className="text-xs font-bold text-on-surface">{order.templates?.title ?? "—"}</p>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-sm font-extrabold text-on-surface">{fmtAmount(order.amount)}</span>
                  <button onClick={() => setSelectedInvoice(order)} className="text-xs font-bold text-primary cursor-pointer bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">View Invoice</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)} className="absolute inset-0 bg-[#010f1f]/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-lg rounded-3xl p-6 md:p-8 border border-white/10 relative z-10 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-on-surface">103 Dev Invoice</h2>
                  <p className="text-[10px] font-mono text-primary mt-1">{selectedInvoice.id}</p>
                </div>
                <button onClick={() => setSelectedInvoice(null)} className="p-1 rounded-lg text-on-surface-variant hover:bg-white/5 cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[9px] uppercase text-outline font-bold">Asset</span>
                  <p className="font-semibold text-on-surface mt-1">{selectedInvoice.templates?.title ?? "—"}</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-outline font-bold">Invoice Details</span>
                  <p className="text-on-surface-variant mt-1">Date: {fmt(selectedInvoice.created_at)}</p>
                  <p className="text-on-surface-variant">Method: {selectedInvoice.payment_method ?? "—"}</p>
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-xs font-bold text-outline uppercase tracking-wider">Total Amount</span>
                <span className="text-xl font-black text-primary">{fmtAmount(selectedInvoice.amount)}</span>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => window.print()} className="bg-surface-container-high border border-outline-variant px-4 py-2 rounded-xl text-xs font-semibold hover:bg-surface-bright text-on-surface cursor-pointer flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">print</span>Print
                </button>
                <button onClick={() => setSelectedInvoice(null)} className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
