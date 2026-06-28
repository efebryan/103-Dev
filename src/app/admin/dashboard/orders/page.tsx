"use client";

import { useState } from "react";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  products: string;
  amount: string;
  paymentMethod: string;
  paymentStatus: "Paid" | "Failed" | "Refunded" | "Pending";
  orderStatus: "Completed" | "Pending" | "Refunded" | "Cancelled";
  purchaseDate: string;
}

export default function AdminOrderManagement() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    { id: "ORD-9012", customerName: "Sarah Jenkins", customerEmail: "sarah@jenkins.co", products: "Horizon AI SaaS Boilerplate", amount: "$199.00", paymentMethod: "Stripe", paymentStatus: "Paid", orderStatus: "Completed", purchaseDate: "June 27, 2026" },
    { id: "ORD-9011", customerName: "Michael Chen", customerEmail: "m.chen@tech.org", products: "Cyberpunk Tailwind UI Kit", amount: "$49.00", paymentMethod: "PayPal", paymentStatus: "Paid", orderStatus: "Completed", purchaseDate: "June 26, 2026" },
    { id: "ORD-9010", customerName: "Alex Rivera", customerEmail: "alex.r@rivera.io", products: "AI Chatbot API Gateway", amount: "$129.00", paymentMethod: "Stripe", paymentStatus: "Pending", orderStatus: "Pending", purchaseDate: "June 25, 2026" },
    { id: "ORD-9009", customerName: "Emma Watson", customerEmail: "emma@watson.dev", products: "Rust High-Performance Web Server", amount: "$79.00", paymentMethod: "Stripe", paymentStatus: "Refunded", orderStatus: "Refunded", purchaseDate: "June 24, 2026" },
    { id: "ORD-9008", customerName: "David Miller", customerEmail: "david@miller.co", products: "Horizon AI SaaS Boilerplate", amount: "$199.00", paymentMethod: "Credit Card", paymentStatus: "Failed", orderStatus: "Cancelled", purchaseDate: "June 23, 2026" },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filterStatus === "all" || order.orderStatus.toLowerCase() === filterStatus;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.products.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Order Management</h1>
        <p className="text-on-surface-variant text-sm mt-1">Review transaction statuses, trace customer invoices, and process balance refunds.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {["all", "completed", "pending", "refunded", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize border cursor-pointer transition-colors ${
                filterStatus === status
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
            placeholder="Search order ID, customer, product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full text-on-surface placeholder:text-on-surface-variant/40"
          />
        </div>
      </div>

      {/* Orders Table container */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase font-semibold tracking-wider">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Products</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6">Payment Method</th>
                <th className="py-4 px-6">Payment Status</th>
                <th className="py-4 px-6">Order Status</th>
                <th className="py-4 px-6">Purchase Date</th>
                <th className="py-4 px-6 text-center">Invoice</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-on-surface">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-high/20 transition-colors">
                  <td className="py-4 px-6 font-mono font-medium text-primary">{order.id}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold">{order.customerName}</p>
                      <p className="text-[10px] text-outline">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant font-medium">{order.products}</td>
                  <td className="py-4 px-6 text-right font-bold text-on-surface">{order.amount}</td>
                  <td className="py-4 px-6 font-medium text-on-surface-variant">{order.paymentMethod}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      order.paymentStatus === "Paid" ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" :
                      order.paymentStatus === "Pending" ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                      order.paymentStatus === "Refunded" ? "bg-purple-400/10 text-purple-400 border-purple-400/20" :
                      "bg-rose-400/10 text-rose-400 border-rose-400/20"
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      order.orderStatus === "Completed" ? "bg-primary/10 text-primary border-primary/20" :
                      order.orderStatus === "Pending" ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                      order.orderStatus === "Refunded" ? "bg-purple-400/10 text-purple-400 border-purple-400/20" :
                      "bg-rose-400/10 text-rose-400 border-rose-400/20"
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant font-medium">{order.purchaseDate}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-primary transition-colors cursor-pointer inline-flex items-center justify-center"
                      title="View Invoice Details"
                    >
                      <span className="material-symbols-outlined text-[18px]">receipt</span>
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    {order.orderStatus === "Completed" && (
                      <button
                        onClick={() => alert(`Initiating full refund process for transaction ${order.id}...`)}
                        className="text-error hover:underline font-semibold cursor-pointer text-xs"
                      >
                        Refund
                      </button>
                    )}
                    {order.orderStatus === "Pending" && (
                      <button
                        onClick={() => alert(`Cancelling order transaction ${order.id}...`)}
                        className="text-rose-400 hover:underline font-semibold cursor-pointer text-xs"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => alert(`Re-sending transaction receipt invoice to ${order.customerEmail}`)}
                      className="text-primary hover:underline font-semibold cursor-pointer text-xs"
                    >
                      Resend
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-on-surface-variant font-medium">
                    No matching order records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Details Dialog Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-[#010f1f]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div>
              <h3 className="text-lg font-bold text-on-surface">Order Invoice Details</h3>
              <p className="text-[10px] text-on-surface-variant font-mono mt-1">Transaction ID: {selectedOrder.id}</p>
            </div>

            <div className="space-y-3 text-xs bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-outline">Customer Name</span>
                <span className="text-on-surface font-semibold">{selectedOrder.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-outline">Email Address</span>
                <span className="text-on-surface font-semibold">{selectedOrder.customerEmail}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-outline">Product Item</span>
                <span className="text-on-surface font-semibold">{selectedOrder.products}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-outline">Payment Method</span>
                <span className="text-on-surface font-semibold">{selectedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-outline">Order Date</span>
                <span className="text-on-surface font-semibold">{selectedOrder.purchaseDate}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-outline font-bold">Total Paid</span>
                <span className="text-primary font-black text-sm">{selectedOrder.amount}</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end text-xs">
              <button
                onClick={() => {
                  alert("Opening browser printing dialog...");
                  window.print();
                }}
                className="bg-white/5 hover:bg-white/10 text-on-surface px-4 py-2 rounded-xl font-semibold border border-white/5 cursor-pointer"
              >
                Print Invoice
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-primary text-on-primary hover:brightness-110 px-4 py-2 rounded-xl font-semibold cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
