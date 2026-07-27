"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminOrderManagement() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("orders")
      .select(`*, users(id, full_name, avatar_url), templates(id, title)`)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = orders.filter(o => {
    const matchStatus = filterStatus === "all" || o.order_status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || o.id.includes(q) || (o.users?.full_name ?? "").toLowerCase().includes(q) || (o.templates?.title ?? "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const fmtAmt = (n: number) => `₦${Number(n).toFixed(2)}`;

  const payBadge: Record<string, string> = {
    paid: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    pending: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    refunded: "bg-purple-400/10 text-purple-400 border-purple-400/20",
    failed: "bg-rose-400/10 text-rose-400 border-rose-400/20",
  };
  const orderBadge: Record<string, string> = {
    completed: "bg-primary/10 text-primary border-primary/20",
    pending: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    refunded: "bg-purple-400/10 text-purple-400 border-purple-400/20",
    cancelled: "bg-rose-400/10 text-rose-400 border-rose-400/20",
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Order Management</h1>
        <p className="text-on-surface-variant text-sm mt-1">Review transaction statuses, trace customer invoices, and process balance refunds.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {["all", "completed", "pending", "refunded", "cancelled"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize border cursor-pointer transition-colors ${filterStatus === s ? "bg-primary text-on-primary border-primary" : "bg-surface-container-high border-outline-variant text-on-surface-variant hover:text-on-surface"}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 w-full md:w-80 focus-within:ring-1 focus-within:ring-primary transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">search</span>
          <input type="text" placeholder="Search order ID, customer, product..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-on-surface placeholder:text-on-surface-variant/40" />
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-16 text-center text-on-surface-variant text-xs">Loading orders…</div>
          ) : (
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6 text-right">Amount</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6">Pay Status</th>
                  <th className="py-4 px-6">Order Status</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-center">Invoice</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-on-surface">
                {filtered.map(order => (
                  <tr key={order.id} className="hover:bg-surface-container-high/20 transition-colors">
                    <td className="py-4 px-6 font-mono font-medium text-primary text-xs">{order.id.slice(0, 8).toUpperCase()}</td>
                    <td className="py-4 px-6">
                      <p className="font-semibold">{order.users?.full_name ?? "—"}</p>
                    </td>
                    <td className="py-4 px-6 text-on-surface-variant font-medium">{order.templates?.title ?? "—"}</td>
                    <td className="py-4 px-6 text-right font-bold">{fmtAmt(order.amount)}</td>
                    <td className="py-4 px-6 font-medium text-on-surface-variant">{order.payment_method ?? "—"}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${payBadge[order.payment_status] ?? "bg-white/5 text-outline border-white/10"}`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${orderBadge[order.order_status] ?? "bg-white/5 text-outline border-white/10"}`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-on-surface-variant font-medium">{fmt(order.created_at)}</td>
                    <td className="py-4 px-6 text-center">
                      <button onClick={() => setSelectedOrder(order)} className="p-1 rounded bg-white/5 hover:bg-white/10 text-primary cursor-pointer">
                        <span className="material-symbols-outlined text-[18px]">receipt</span>
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      {order.order_status === "completed" && (
                        <button className="text-error hover:underline font-semibold cursor-pointer text-xs">Refund</button>
                      )}
                      {order.order_status === "pending" && (
                        <button className="text-rose-400 hover:underline font-semibold cursor-pointer text-xs">Cancel</button>
                      )}
                      <button className="text-primary hover:underline font-semibold cursor-pointer text-xs">Resend</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={10} className="py-8 text-center text-on-surface-variant font-medium">No matching order records found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-[#010f1f]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 relative">
            <button onClick={() => setSelectedOrder(null)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-lg cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div>
              <h3 className="text-lg font-bold text-on-surface">Order Invoice Details</h3>
              <p className="text-[10px] text-on-surface-variant font-mono mt-1">ID: {selectedOrder.id}</p>
            </div>
            <div className="space-y-3 text-xs bg-white/5 p-4 rounded-2xl border border-white/5">
              {[
                ["Customer", selectedOrder.users?.full_name ?? "—"],
                ["Product", selectedOrder.templates?.title ?? "—"],
                ["Payment Method", selectedOrder.payment_method ?? "—"],
                ["Date", fmt(selectedOrder.created_at)],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-outline">{label}</span>
                  <span className="text-on-surface font-semibold">{val}</span>
                </div>
              ))}
              <div className="flex justify-between pt-1">
                <span className="text-outline font-bold">Total Paid</span>
                <span className="text-primary font-black text-sm">{fmtAmt(selectedOrder.amount)}</span>
              </div>
            </div>
            <div className="flex gap-3 justify-end text-xs">
              <button onClick={() => { window.print(); }} className="bg-white/5 hover:bg-white/10 text-on-surface px-4 py-2 rounded-xl font-semibold border border-white/5 cursor-pointer">Print</button>
              <button onClick={() => setSelectedOrder(null)} className="bg-primary text-on-primary hover:brightness-110 px-4 py-2 rounded-xl font-semibold cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
