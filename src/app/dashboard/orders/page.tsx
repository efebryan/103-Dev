"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function OrdersPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  const orders = [
    {
      id: "ORD-7729",
      date: "June 25, 2026",
      products: ["Horizon AI SaaS Boilerplate (Pro Plan)"],
      total: "$199.00",
      status: "Completed",
      paymentMethod: "Stripe (Card ending in 4242)",
    },
    {
      id: "ORD-6510",
      date: "June 12, 2026",
      products: ["Cyberpunk Tailwind UI Kit"],
      total: "$49.00",
      status: "Completed",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-4412",
      date: "May 30, 2026",
      products: ["Rust High-Performance Web Server"],
      total: "$129.00",
      status: "Completed",
      paymentMethod: "Stripe (Card ending in 1188)",
    },
  ];

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(o => o.status.toLowerCase() === filterStatus);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Order History</h1>
        <p className="text-on-surface-variant text-sm mt-1">Access past invoices, purchase records, and transaction receipts.</p>
      </div>

      {/* Orders Table */}
      {/* Orders Container */}
      <div className="space-y-6">
        {/* Desktop View Table */}
        <div className="hidden md:block glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-base font-bold text-on-surface">All Orders</h3>
            <div className="flex gap-2">
              <button className="bg-surface-container-high border border-outline-variant px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-surface-bright transition-colors text-on-surface cursor-pointer">
                Download Invoices CSV
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Purchase Date</th>
                  <th className="py-4 px-6">Assets</th>
                  <th className="py-4 px-6 text-right">Total Paid</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-on-surface">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container-high/20 transition-colors">
                    <td className="py-4 px-6 font-mono font-medium text-primary">{order.id}</td>
                    <td className="py-4 px-6 text-on-surface-variant">{order.date}</td>
                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        {order.products.map((p, i) => (
                          <p key={i} className="font-semibold">{p}</p>
                        ))}
                        <p className="text-[10px] text-outline">Via {order.paymentMethod}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-on-surface">{order.total}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border bg-primary/10 text-primary border-primary/20">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => setSelectedInvoice(order)}
                        className="text-primary hover:underline text-xs font-semibold cursor-pointer"
                      >
                        View Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View Card List */}
        <div className="block md:hidden space-y-4">
          {filteredOrders.map((order) => (
            <div 
              key={order.id} 
              className="glass-card rounded-2xl p-5 border border-white/5 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-primary font-bold">{order.id}</span>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">{order.date}</p>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase">
                  {order.status}
                </span>
              </div>

              <div className="border-t border-b border-white/5 py-3 space-y-1">
                {order.products.map((product, i) => (
                  <p key={i} className="text-xs font-bold text-on-surface leading-snug">{product}</p>
                ))}
                <p className="text-[9px] text-outline mt-1 font-medium">Payment method: {order.paymentMethod}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase text-outline font-bold">Total Paid</span>
                  <span className="text-sm font-extrabold text-on-surface">{order.total}</span>
                </div>
                <button 
                  onClick={() => setSelectedInvoice(order)}
                  className="text-xs font-bold text-primary hover:underline cursor-pointer bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10"
                >
                  View Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Modal Overlay */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="absolute inset-0 bg-[#010f1f]/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-lg rounded-3xl p-6 md:p-8 border border-white/10 relative z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-on-surface">103 Dev Invoice</h2>
                  <p className="text-[10px] font-mono text-primary mt-1">{selectedInvoice?.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {/* Invoice Meta */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[9px] uppercase text-outline font-bold">Billed To</span>
                  <p className="font-semibold text-on-surface mt-1">Bryan</p>
                  <p className="text-on-surface-variant">bryan@103.dev</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-outline font-bold">Invoice Details</span>
                  <p className="text-on-surface-variant mt-1">Date: {selectedInvoice?.date}</p>
                  <p className="text-on-surface-variant">Method: {selectedInvoice?.paymentMethod}</p>
                </div>
              </div>

              {/* Line Items */}
              <div className="border-t border-b border-white/5 py-4 space-y-2">
                <span className="text-[9px] uppercase text-outline font-bold block mb-1">Purchased Items</span>
                {selectedInvoice?.products?.map((item: string, i: number) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-on-surface font-medium">{item}</span>
                    <span className="text-on-surface font-bold">{selectedInvoice?.total}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-xs font-bold text-outline uppercase tracking-wider">Total Amount</span>
                <span className="text-xl font-black text-primary">{selectedInvoice?.total}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-end">
                <button 
                  onClick={() => {
                    window.print();
                  }}
                  className="bg-surface-container-high border border-outline-variant px-4 py-2 rounded-xl text-xs font-semibold hover:bg-surface-bright transition-colors text-on-surface cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  Print
                </button>
                <button 
                  onClick={() => alert("Invoice PDF downloaded successfully.")}
                  className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  Download PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
